import { chain, sumBy } from "lodash";
import { ITelegramContext } from "../types";
import { IEcwidOrder, IEcwidProduct } from "../../../lib/Ecwid/types";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import context from "../../../lib/context";
import { IDatabase } from "../../../lib/JsonBin";
import { aliasProductName } from "../utils";
import table from "../table";

const calculateExtras = (orders: IEcwidOrder[], db: IDatabase) =>
  chain(orders)
    .flatMap(order => order.items)
    .filter(orderItem => db.extrasSku.includes(orderItem.sku))
    .groupBy("sku")
    .mapValues(orderItems => sumBy(orderItems, "quantity"))
    .entries()
    .map(([sku, soldCount]) => {
      const name = aliasProductName({ sku } as IEcwidProduct, db);
      const maxCount = db.extrasMaxCount[sku];
      const soldPercent = Math.floor((soldCount / maxCount) * 100);

      const countFmt =
        maxCount > 0 ? `${soldCount} из ${maxCount}` : soldCount.toString();
      const percentFmt = maxCount > 0 ? `${soldPercent}%` : "";

      return [name, countFmt, percentFmt];
    })
    .value();

const formatMessage = (orders: IEcwidOrder[], db: IDatabase): string => {
  const extrasRows = calculateExtras(orders, db);

  return table(extrasRows);
};

const extras = async (tgCtx: ITelegramContext): Promise<any> => {
  const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);
  const text = formatMessage(orders, tgCtx.database);

  tgCtx.replyWithMarkdown(text);
};

export default extras;
