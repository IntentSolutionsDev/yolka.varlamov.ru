import { NowRequest } from "@now/node";
import CryptoJS from "crypto-js";
import { IEcwidWebhookBody } from "../../lib/Ecwid/types";

const checkSignature = (request: NowRequest, clientSecret: string): boolean => {
  const body = (request.body || {}) as IEcwidWebhookBody;
  const signature = request.headers["X-Ecwid-Webhook-Signature"];

  const message = `${body.eventCreated}.${body.eventId}`;
  const hash = CryptoJS.HmacSHA256(message, clientSecret);
  const base64Hash = CryptoJS.enc.Base64.stringify(hash);

  return signature === base64Hash;
};

export default checkSignature;
