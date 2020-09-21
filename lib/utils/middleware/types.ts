import { NowRequest, NowResponse } from "@now/node";

type Handler = (request: NowRequest, response: NowResponse) => any;

export { Handler };
