import { ITelegramContext } from "../types";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import { freeTreesByCoupon } from "../../../lib/Ecwid/utils";
import context from "../../../lib/context";

import { formatMessage } from "./goods";

export interface IGoodsOptions {
  goods2?: boolean;
  newgoods?: boolean;
}

export const soldBefore8Dec: Record<string, number> = {
  "100001": 39,
  "100002": 37,
  "100003": 73,
  "100004": 66,
  "100005": 21,
  "100006": 16,
};

const goods2 = async (tgCtx: ITelegramContext): Promise<any> => {
  const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);
  const freeAvtormediaCount = freeTreesByCoupon(
    orders,
    tgCtx.database.avtormediaCoupon,
    tgCtx.database,
  );

  const products = await context.ecwidApi.products();
  const text = formatMessage(products, freeAvtormediaCount, tgCtx.database, {
    goods2: true,
  });

  tgCtx.replyWithMarkdown(text);
};

export default goods2;
