import { ITelegramContext } from "../types";

const start = (tgCtx: ITelegramContext): Promise<any> => {
  return tgCtx.reply("Привет");
};

export default start;
