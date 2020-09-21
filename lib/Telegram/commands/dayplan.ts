import { chain, sum } from "lodash";
import { utcToZonedTime } from "date-fns-tz";
import { ITelegramContext } from "../types";
import context from "../../../lib/context";
import { IDatabase } from "../../../lib/JsonBin";
import { IEcwidOrder } from "../../../lib/Ecwid/types";
import { treesCountInOrder, isFreeOrder } from "../../../lib/Ecwid/utils";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import formatDate from "../../../lib/utils/formatDate";
import table from "../table";

const todayTs = (): number => {
  const lastDay = new Date().getTime();
  const timestamp = Math.round(lastDay / 1000);

  return timestamp;
};

const tsToHour = (timestamp: number): number => {
  return utcToZonedTime(timestamp * 1000, "Europe/Moscow").getHours();
};

// eslint-disable-next-line
const cumulativeSum = (sum: number) => (value: number) => (sum += value);

const calculateSoldTreesPerHour = (orders: IEcwidOrder[], db: IDatabase) =>
  chain(orders)
    .filter(order => order.total > 0)
    .filter(order => !isFreeOrder(order))
    .map(order => ({
      hour: tsToHour(order.createTimestamp),
      count: treesCountInOrder(order, db),
    }))
    .groupBy("hour")
    .mapValues(orders => sum(orders.map(order => order.count)))
    .value();

const formatMessage = (
  orders: IEcwidOrder[],
  todayTs: number,
  db: IDatabase,
): string => {
  const today = formatDate(todayTs);
  const todayPlan = db.planPerDay[today];
  // Берем время от UTC и добавляем до Московского, не берем московское время т.к. ниже в if
  // время сравнивается
  const nowHour = new Date().getUTCHours() + 3;

  const soldPerHour = calculateSoldTreesPerHour(orders, db);
  const cumulative = cumulativeSum(0);

  const dayPlanRows = db.planPerHour.map(({ hour, percent }, index) => {
    const hourPlan = Math.round(todayPlan * percent);
    const hourIndex = db.planPerHour[0].hour + index;
    const hourFmt = `${hour}:59`;

    const sold = soldPerHour[hour] ?? 0;

    if (nowHour >= hourIndex) {
      return [hourFmt, hourPlan, cumulative(sold)];
    }

    return [hourFmt, hourPlan, 0];
  });

  const header = `План на день: ${todayPlan}`;
  const tableHeader = ["", "план", "продажи"];
  const fullTable = [tableHeader, ...dayPlanRows] as string[][];

  return `${header}\n${table(fullTable)}`;
};

const dayplan = async (tgCtx: ITelegramContext): Promise<any> => {
  const today = todayTs();
  const now = new Date();
  const createdFrom = Math.round(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 1000,
  );

  const options = {
    ...ecwidOrdersOptions,
    createdFrom,
  };

  const orders = await context.ecwidApi.ordersAll(options);

  const text = formatMessage(orders, today, tgCtx.database);

  return tgCtx.replyWithMarkdown(text);
};

export default dayplan;
