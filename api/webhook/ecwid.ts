import { NowRequest, NowResponse } from "@now/node";
import env from "../../lib/env";
import context from "../../lib/context";
import errorCheck from "../../lib/utils/middleware/errorCheck";
import { IEcwidWebhookBody } from "../../lib/Ecwid/types";
import checkSignature from "../../lib/utils/checkEcwidSignature";
import orderToDeal from "../../lib/utils/orderToDeal";
import { treesCountInOrder } from "../../lib/Ecwid/utils";

const onOrderCreated = async (orderId: number) => {
  const db = await context.jsonBin.get();
  const order = await context.ecwidApi.getOrderById(orderId);

  await Promise.all([
    context.telegram.pushEcwidOrder(order, db),

    async () => {
      const deal = await orderToDeal(order);
      await context.amocrmApi.postDeal(deal);
    },
  ]);
};

const onOrderUpdated = async (orderId: number) => {
  const db = await context.jsonBin.get();
  const order = await context.ecwidApi.getOrderById(orderId);

  if (order.total === 0 && treesCountInOrder(order, db) > 0) {
    await context.telegram.pushEcwidCancel(order, db);
  }
};

const ecwidWebhookHandler = async (
  request: NowRequest,
  response: NowResponse,
) => {
  // if (!checkSignature(request, env.ecwidClientSecret)) {
  //   return response.status(401).json({ error: "Invalid signature" });
  // }

  const body = (request.body || {}) as IEcwidWebhookBody;

  switch (body.eventType) {
    case "order.created":
      await onOrderCreated(body.entityId);
      break;

    case "order.updated":
      await onOrderUpdated(body.entityId);
      break;

    default:
      break;
  }

  return response.status(200).json({ status: "ok" });
};

export default errorCheck(ecwidWebhookHandler);
