import { ITelegramContext } from "../types";
import ecwidOrdersOptions from "../../../lib/utils/ecwidOrdersOptions";
import { freeTreesByCoupon } from "../../../lib/Ecwid/utils";
import context from "../../../lib/context";

import { formatMessage } from "./goods";

const newgoods = async (tgCtx: ITelegramContext): Promise<any> => {
  const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);
  const freeAvtormediaCount = freeTreesByCoupon(
    orders,
    tgCtx.database.avtormediaCoupon,
    tgCtx.database,
  );

  const products = await context.ecwidApi.products();
  const text = formatMessage(products, freeAvtormediaCount, tgCtx.database, {
    newgoods: true,
  });

  tgCtx.replyWithMarkdown(text);
};

export default newgoods;
