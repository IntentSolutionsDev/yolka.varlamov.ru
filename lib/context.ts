import env from "../lib/env";
import AmoCRM from "../lib/AmoCRM";
import Ecwid from "../lib/Ecwid";
import Zeit from "../lib/Zeit";
import Telegram from "../lib/Telegram";
import JsonBin from "../lib/JsonBin";

interface IContext {
  amocrmApi: AmoCRM;
  ecwidApi: Ecwid;
  zeitApi: Zeit;
  telegram: Telegram;
  jsonBin: JsonBin;
}

const amocrmApi = new AmoCRM({
  subdomain: env.amocrmSubdomain,
  integrationId: env.amocrmIntegrationId,
  integrationSecret: env.amocrmIntegrationSecret,
  integrationRedirectUri: env.amocrmIntegrationRedirectUri,
  accessToken: env.amocrmAccessToken,
  refreshToken: env.amocrmRefreshToken,
  goodsCatalogId: env.amocrmGoodsCatalogId,
});

const ecwidApi = new Ecwid({
  storeId: env.ecwidStoreId,
  secretToken: env.ecwidSecretToken,
});

const zeitApi = new Zeit({
  token: env.zeitToken,
  teamId: env.zeitTeamId,
});

const telegram = new Telegram({
  token: env.telegramToken,
  chatId: env.telegramChatId,
});

const jsonBin = new JsonBin({
  secret: env.jsonbinSecret,
  binId: env.jsonbinBinId,
});

const context: IContext = {
  amocrmApi,
  ecwidApi,
  zeitApi,
  telegram,
  jsonBin,
};

export default context;
