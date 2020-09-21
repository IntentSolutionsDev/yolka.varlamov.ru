/* eslint-disable no-console */

import context from "../lib/context";

const baseUrl = process.argv[2];

context.telegram
  .setWebhook(baseUrl)
  .then(() => console.log("Ok"))
  .catch(console.error);
