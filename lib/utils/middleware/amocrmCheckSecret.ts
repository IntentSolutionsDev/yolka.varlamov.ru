import { NowRequest, NowResponse } from "@now/node";
import env from "../../env";
import { Handler } from "./types";

const amocrmCheckSecretMiddleware = (handler: Handler) => (
  request: NowRequest,
  response: NowResponse,
) => {
  const bodySecret = request.body?.integrationSecret;
  const querySecret = request.query?.integrationSecret;
  const secret = bodySecret || querySecret;

  if (secret !== env.amocrmIntegrationSecret) {
    return response.status(401).json({ error: "Invalid secret" });
  }

  return handler(request, response);
};

export default amocrmCheckSecretMiddleware;
