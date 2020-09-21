import { chain, sum, map } from "lodash";
import { ITelegramContext } from "../types";
import context from "../../../lib/context";
import { IDatabase } from "../../../lib/JsonBin";
import { IEcwidOrder } from "../../../lib/Ecwid/types";
import { treesCountInOrder } from "../../../lib/Ecwid/utils";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import table from "../table";

const cityName = (order: IEcwidOrder, db: IDatabase): string => {
  const name = order.shippingPerson?.city;

  if (db.citiesAliases[name]) {
    return db.citiesAliases[name];
  }

  return name || "Самовывоз";
};

const formatMessage = (orders: IEcwidOrder[], db: IDatabase): string => {
  const treesCountRows = chain(orders)
    .map(order => ({
      city: cityName(order, db),
      count: treesCountInOrder(order, db),
    }))
    .groupBy("city")
    .mapValues(a => map(a, "count"))
    .mapValues(sum)
    .toPairs()
    .filter(([city, count]) => count > 0)
    .sortBy(([city, count]) => count)
    .reverse()
    .map(([city, count]) => [`${city}:`, `${count}шт.`])
    .value();

  return table(treesCountRows);
};

const cities = async (tgCtx: ITelegramContext): Promise<any> => {
  const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);
  const text = formatMessage(orders, tgCtx.database);

  return tgCtx.replyWithMarkdown(text);
};

export default cities;
