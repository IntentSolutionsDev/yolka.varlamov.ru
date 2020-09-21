import { chain, sum, sumBy, map } from "lodash";
import { ITelegramContext } from "../types";
import context from "../../../lib/context";
import { IDatabase } from "../../../lib/JsonBin";
import { IEcwidOrder, IEcwidOrderItem } from "../../../lib/Ecwid/types";
import { treesCountInOrder } from "../../../lib/Ecwid/utils";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import table from "../table";

const calculateCoupons = (orders: IEcwidOrder[], db: IDatabase) =>
  chain(orders)
    .filter(order => order.discountCoupon)
    .groupBy("discountCoupon.name")
    .mapValues(orders => orders.map(order => treesCountInOrder(order, db)))
    .mapValues(treesCounts => sum(treesCounts))
    .value();

const formatMessage = (orders: IEcwidOrder[], db: IDatabase): string => {
  const coupons = calculateCoupons(orders, db);
  const couponsRows = Object.entries(coupons)
    .sort((a, b) => b[1] - a[1])
    .map(([coupon, count]) => [`${coupon}:`, `${count}шт`]);

  const total = sum(Object.values(coupons));
  const footer = `Всего по купонам: ${total}шт`;

  return `${table(couponsRows)}\n${footer}`;
};

const coupons = async (tgCtx: ITelegramContext): Promise<any> => {
  const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);
  const text = formatMessage(orders, tgCtx.database);

  return tgCtx.replyWithMarkdown(text);
};

export default coupons;
