import { NowRequest, NowResponse } from "@now/node";
import errorCheck from "../../lib/utils/middleware/errorCheck";
import context from "../../lib/context";
import env from "../../lib/env";

const callback = context.telegram.webhookCallback();

export default errorCheck(callback);
