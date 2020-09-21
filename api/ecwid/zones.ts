import { NowRequest, NowResponse } from "@now/node";
import errorCheck from "../../lib/utils/middleware/errorCheck";
import ecwidCors from "../../lib/utils/middleware/ecwidCors";
import context from "../../lib/context";

const ecwidZones = async (request: NowRequest, response: NowResponse) => {
  const profile = await context.ecwidApi.profile();

  return response.status(200).json(profile.zones);
};

export default errorCheck(ecwidCors(ecwidZones));
