import { NowRequest, NowResponse } from "@now/node";
import amocrmCheckSecretMiddleware from "../lib/utils/middleware/amocrmCheckSecret";
import context from "../lib/context";
import env from "../lib/env";

const refreshAmocrmToken = async (
  request: NowRequest,
  response: NowResponse,
) => {
  const newTokens = await context.amocrmApi.refreshAccessToken();

  await Promise.all([
    context.zeitApi.deleteSecret(env.zeitAmocrmAccessTokenSecretName),
    context.zeitApi.deleteSecret(env.zeitAmocrmRefreshTokenSecretName),
  ]);

  await Promise.all([
    context.zeitApi.createSecret(
      env.zeitAmocrmAccessTokenSecretName,
      newTokens.access_token,
    ),
    context.zeitApi.createSecret(
      env.zeitAmocrmRefreshTokenSecretName,
      newTokens.refresh_token,
    ),
  ]);

  return response.status(200).json({ status: "ok" });
};

export default amocrmCheckSecretMiddleware(refreshAmocrmToken);
