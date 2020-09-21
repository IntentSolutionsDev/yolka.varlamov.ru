import { NowRequest, NowResponse } from "@now/node";
import errorCheck from "../lib/utils/middleware/errorCheck";
import context from "../lib/context";
import env from "../lib/env";

const pushTelegramSales = async (
  request: NowRequest,
  response: NowResponse,
) => {
  if (request.headers.token !== env.telegramToken) {
    return response.status(403).json({ error: "Invalid token" });
  }

  await context.telegram.pushSales();

  return response.status(200).json({ status: "ok" });
};

export default errorCheck(pushTelegramSales);
