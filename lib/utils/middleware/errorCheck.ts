import { NowRequest, NowResponse } from "@now/node";
import errorHandler from "../../../lib/utils/errorHandler";
import { Handler } from "./types";

const errorCheck = (handler: Handler) => async (
  request: NowRequest,
  response: NowResponse,
) => {
  try {
    return await handler(request, response);
  } catch (error) {
    await errorHandler(error);

    return response.status(500).json({ error: "Internal server error" });
  }
};

export default errorCheck;
