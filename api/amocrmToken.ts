import { NowRequest, NowResponse } from "@now/node";
import amocrmCheckSecretMiddleware from "../lib/utils/middleware/amocrmCheckSecret";
import env from "../lib/env";

const amocrmToken = async (request: NowRequest, response: NowResponse) => {
  return response.status(200).json({
    accessToken: env.amocrmAccessToken,
    refreshToken: env.amocrmRefreshToken,
  });
};

export default amocrmCheckSecretMiddleware(amocrmToken);
