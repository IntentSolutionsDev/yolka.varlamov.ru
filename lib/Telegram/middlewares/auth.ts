import { ITelegramContext } from "../types";

const authMiddleware = async (ctx: ITelegramContext, next?: () => any) => {
  const { admins } = ctx.database;
  const fromUsername = ctx.message?.from?.username ?? "";

  if (admins.includes(fromUsername) && next) {
    await next();
  }
};

export default authMiddleware;
