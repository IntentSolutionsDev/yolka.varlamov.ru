import context from "../../../lib/context";
import { ITelegramContext } from "../types";

const databaseMiddleware = async (ctx: ITelegramContext, next?: () => any) => {
  ctx.database = await context.jsonBin.get();

  if (next) {
    await next();
  }
};

export default databaseMiddleware;
