import * as Sentry from "@sentry/node";
import env from "../../lib/env";

Sentry.init({ dsn: env.sentryDsn });

process.on("unhandledRejection", error => {
  Sentry.captureException(error);
});

process.on("uncaughtException", error => {
  Sentry.captureException(error);
});

const errorHandler = async (error: Error, tags?: { [key: string]: any }) => {
  console.error(error.message);

  if (tags) {
    Sentry.setTags(tags);
  }

  Sentry.captureException(error);
  await Sentry.flush();
};

export default errorHandler;
