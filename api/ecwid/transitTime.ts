import { NowRequest, NowResponse } from "@now/node";
import errorCheck from "../../lib/utils/middleware/errorCheck";
import ecwidCors from "../../lib/utils/middleware/ecwidCors";
import context from "../../lib/context";

const moscowHours = (): number => {
  const moscowTimeString = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
  });
  const moscowTime = new Date(moscowTimeString);

  return moscowTime.getHours();
};

const normalize = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\+/g, "")
    .replace(/\s/g, "");
};

const ecwidTransitTime = async (request: NowRequest, response: NowResponse) => {
  const profile = await context.ecwidApi.profile();

  const city = normalize(request.query.city as string);
  const shippingOption = profile.shipping.shippingOptions
    .filter(option => option.enabled)
    .find(option => {
      return normalize(option.title).includes(city);
    });

  if (!shippingOption) {
    return response.status(200).send(1);
  }

  const additionalDays = moscowHours() >= 19 ? 1 : 0;
  const transitTime = +shippingOption.deliveryTimeDays + additionalDays;

  return response.status(200).send(transitTime);
};

export default errorCheck(ecwidCors(ecwidTransitTime));
