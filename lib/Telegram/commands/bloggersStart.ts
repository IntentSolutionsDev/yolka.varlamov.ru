import { merge } from "lodash";
import context from "../../../lib/context";
import { ITelegramContext } from "../types";

const bloggersStart = async (tgCtx: ITelegramContext): Promise<any> => {
  const chatId = tgCtx.chat?.id;
  const promoCode = tgCtx.message?.text?.split(" ")[1];

  if (!chatId || !promoCode) {
    return tgCtx.reply("Ошибка");
  }

  const dbUpdate = {
    bloggers: {
      [promoCode]: chatId,
    },
  };
  const newDb = merge(tgCtx.database, dbUpdate);
  await context.jsonBin.set(newDb);

  return tgCtx.reply("👌");
};

export default bloggersStart;
