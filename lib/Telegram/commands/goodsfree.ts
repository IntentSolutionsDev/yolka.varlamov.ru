import { chain, sum, sumBy, map } from "lodash";
import { ITelegramContext } from "../types";
import context from "../../../lib/context";
import { IDatabase } from "../../../lib/JsonBin";
import { IEcwidOrder, IEcwidOrderItem } from "../../../lib/Ecwid/types";
import { isFreeOrder } from "../../../lib/Ecwid/utils";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import { aliasProductName } from "../utils";
import table from "../table";

const calculateFreeGoods = (orders: IEcwidOrder[], db: IDatabase) =>
  chain(orders)
    .filter(isFreeOrder)
    .flatMap(order => order.items)
    .filter(item => db.treesSku.includes(item.sku))
    .groupBy("sku")
    .mapValues(items => sumBy(items, "quantity"))
    .value();

const formatMessage = (orders: IEcwidOrder[], db: IDatabase): string => {
  const freeGoods = calculateFreeGoods(orders, db);
  const total = sum(Object.values(freeGoods));
  const header = `Бесплатных ёлок ${total}шт`;

  const freeGoodsRows = Object.entries(freeGoods).map(([sku, count]) => {
    const name = aliasProductName({ sku } as IEcwidOrderItem, db);
    return [name, `${count}шт`];
  });

  return `${header}\n${table(freeGoodsRows)}`;
};

const goodsfree = async (tgCtx: ITelegramContext): Promise<any> => {
  const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);
  const text = formatMessage(orders, tgCtx.database);

  return tgCtx.replyWithMarkdown(text);
};

export default goodsfree;
