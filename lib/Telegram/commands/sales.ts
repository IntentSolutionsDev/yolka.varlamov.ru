import { chain, sumBy } from "lodash";
import { ITelegramContext } from "../types";
import { IEcwidOrder } from "../../../lib/Ecwid/types";
import context from "../../../lib/context";
import { IDatabase } from "../../../lib/JsonBin";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import {
  treesTotal,
  treesCountInOrder,
  isFreeOrder,
  freeTreesByCoupon,
} from "../../../lib/Ecwid/utils";
import formatDate from "../../../lib/utils/formatDate";
import { formatMoney } from "../utils";
import table from "../table";

const sumDayOrders = (array: any[]) =>
  array.reduce(
    (acc, item) => {
      acc.plan = item.plan;
      acc.count += item.count;
      acc.total += item.total;
      acc.paidTotal += item.paidTotal;

      return acc;
    },
    { count: 0, total: 0, paidTotal: 0 },
  );

const calculateSalesPerDay = (
  orders: IEcwidOrder[],
  db: IDatabase,
  sku?: string,
) =>
  chain(orders)
    .filter(order => order.total !== 0)
    .filter(order => treesCountInOrder(order, db) > 0)
    .filter(order => !isFreeOrder(order))
    .map(rawOrder => {
      const order = sku
        ? {
            ...rawOrder,
            items: rawOrder.items.filter(item => item.sku === sku),
          }
        : rawOrder;
      const date = formatDate(order.createTimestamp);
      const count = treesCountInOrder(order, db);
      const total = treesTotal(order, db);
      const paidTotal = order.paymentStatus === "PAID" ? total : 0;

      return { date, count, total, paidTotal, plan: db.planPerDay[date] };
    })
    .groupBy("date")
    .mapValues(sumDayOrders)
    .value();

const daysSum = (array: any[], field: string): number => sumBy(array, field);

const calculateFreeTrees = (
  orders: IEcwidOrder[],
  db: IDatabase,
  sku?: string,
): number =>
  chain(orders)
    .filter(order => order.total === 0)
    .map(order => treesCountInOrder(order, db))
    .sum()
    .value();

const formatMessage = (
  orders: IEcwidOrder[],
  db: IDatabase,
  sku?: string,
): string => {
  const header = sku ? `${db.productAliases[sku]}\n` : ``;
  const salesPerDay = calculateSalesPerDay(orders, db, sku);

  const daysRows = Object.entries(db.planPerDay).map(([day, plan]) => {
    const daySales = salesPerDay[day] ?? { count: 0, total: 0, paidTotal: 0 };
    const total = formatMoney(daySales.total);
    const count = `${daySales.count}шт`;
    const planFmt = `(план ${plan})`;
    const rows = [day, total, count];

    if (sku) {
      return rows;
    }

    return [...rows, planFmt];
  });

  const days = Object.entries(salesPerDay).map(([date, info]) => ({
    ...info,
    date,
  }));

  const total = daysSum(days, "total");
  const paidTotal = daysSum(days, "paidTotal");
  const totalCount = daysSum(days, "count");
  // NOTE: Не отображается при sku
  const totalPlan = daysSum(days, "plan");
  const freeCount = calculateFreeTrees(orders, db);
  const freeAvtormediaCount = freeTreesByCoupon(
    orders,
    db.avtormediaCoupon,
    db,
  );

  const footer = [
    `Всего заказов на: ${formatMoney(total)}`,
    `Всего оплачено: ${formatMoney(paidTotal)}`,
    ...(sku
      ? [`Всего ёлок: ${totalCount}шт`]
      : [
          `Всего ёлок: ${totalCount}шт (план ${totalPlan}шт)`,
          `Бесплатных и обменных ёлок: ${freeCount}шт`,
          `Бесплатные "Авторские медиа": ${freeAvtormediaCount}шт`,
        ]),
  ].join("\n");

  return `${header}${table(daysRows)}\n${footer}`;
};

const sales = (sku?: string) => async (
  tgCtx: ITelegramContext,
): Promise<any> => {
  const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);
  const text = formatMessage(orders, tgCtx.database, sku);

  tgCtx.replyWithMarkdown(text);
};

export { formatMessage };
export default sales;
