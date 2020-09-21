import { omit } from "lodash";
import context from "../../../lib/context";
import { ITelegramContext } from "../types";

const bloggersStop = async (tgCtx: ITelegramContext): Promise<any> => {
  const promoCode = tgCtx.message?.text?.split(" ")[1];

  if (!promoCode) {
    return tgCtx.reply("Ошибка");
  }

  const newDb = omit(tgCtx.database, `bloggers.${promoCode}`);
  await context.jsonBin.set(newDb);

  return tgCtx.reply("👌");
};

export default bloggersStop;
