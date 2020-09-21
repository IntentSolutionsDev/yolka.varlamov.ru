import { NowRequest, NowResponse } from "@now/node";
import env from "../../env";
import { Handler } from "./types";

const ecwidCorsMiddleware = (handler: Handler) => (
  request: NowRequest,
  response: NowResponse,
) => {
  response.setHeader("Access-Control-Allow-Origin", env.ecwidAllowCorsUrl);

  return handler(request, response);
};

export default ecwidCorsMiddleware;
