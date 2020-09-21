import { sum, has } from "lodash";
import { ITelegramContext } from "../types";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import { freeTreesByCoupon } from "../../../lib/Ecwid/utils";
import { IEcwidProduct } from "../../../lib/Ecwid/types";
import context from "../../../lib/context";
import { IDatabase } from "../../../lib/JsonBin";
import { aliasProductName } from "../utils";
import table from "../table";

import { IGoodsOptions, soldBefore8Dec } from "./goods2";

export const calulateGoods = (
  products: IEcwidProduct[],
  freeAvtormediaCount: number,
  db: IDatabase,
  options: IGoodsOptions = { goods2: false, newgoods: false },
) =>
  products
    .filter(product => db.treesSku.includes(product.sku))
    .sort((a, b) => +a.sku - +b.sku)
    .map(product => {
      const name = aliasProductName(product, db);
      const maxCount = db.treesMaxCount[product.sku];

      let soldCount = maxCount - product.quantity;

      if (product.sku === db.avtormediaTreeSku) {
        soldCount = soldCount + 100 - freeAvtormediaCount;
      }

      // Проверяем что продукт совпадает с номером и вычитаем кол-во товара
      if (options.goods2 && has(soldBefore8Dec, product.sku)) {
        soldCount -= soldBefore8Dec[product.sku];
      }

      if (options.newgoods) {
        soldCount = product.quantity;
      }

      const soldPercent = Math.round((soldCount / maxCount) * 100);

      return { name, maxCount, soldCount, soldPercent };
    });

export const formatMessage = (
  products: IEcwidProduct[],
  freeAvtormediaCount: number,
  db: IDatabase,
  options: IGoodsOptions = { goods2: false, newgoods: false },
): string => {
  const goods = calulateGoods(products, freeAvtormediaCount, db, options);
  const goodsRows = goods.map(good => [
    good.name,
    `${good.soldCount} из ${good.maxCount}`,
    `${good.soldPercent}%`,
  ]);

  const totalMaxCount = sum(goods.map(good => good.maxCount));
  const totalSoldCount = sum(goods.map(good => good.soldCount));
  const soldPercent = Math.floor((totalSoldCount / totalMaxCount) * 100);

  let totalFmt = `Всего купили: ${totalSoldCount} из ${totalMaxCount} (${soldPercent}%)`;
  let avtormediaFmt = `Бесплатные "Авторские Медиа": ${freeAvtormediaCount} из 100`;

  if (options.newgoods) {
    totalFmt = `Всего осталось: ${totalSoldCount} из ${totalMaxCount} (${soldPercent}%)`;
    avtormediaFmt = `Бесплатные "Авторские Медиа": ${100 -
      freeAvtormediaCount} из 100`;
  }

  const footer = [totalFmt, avtormediaFmt].join("\n");

  return `${table(goodsRows)}\n${footer}`;
};

const goods = async (tgCtx: ITelegramContext): Promise<any> => {
  const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);
  const freeAvtormediaCount = freeTreesByCoupon(
    orders,
    tgCtx.database.avtormediaCoupon,
    tgCtx.database,
  );

  const products = await context.ecwidApi.products();
  const text = formatMessage(products, freeAvtormediaCount, tgCtx.database);

  tgCtx.replyWithMarkdown(text);
};

export default goods;
