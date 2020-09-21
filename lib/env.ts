import { config } from "dotenv";

config();

interface IEnv {
  // amocrmSubdomain: string;
  // amocrmIntegrationId: string;
  // amocrmIntegrationSecret: string;
  // amocrmIntegrationRedirectUri: string;
  // amocrmAccessToken: string;
  // amocrmRefreshToken: string;
  // amocrmGoodsCatalogId: string;
  ecwidStoreId: string;
  ecwidPublicToken: string;
  ecwidSecretToken: string;
  ecwidClientSecret: string;
  ecwidAllowCorsUrl: string;
  zeitToken: string;
  zeitTeamId: string;
  zeitAmocrmAccessTokenSecretName: string;
  zeitAmocrmRefreshTokenSecretName: string;
  telegramToken: string;
  telegramChatId: string;
  jsonbinSecret: string;
  jsonbinBinId: string;
  sentryDsn: string;
}

const envVar = (name: string): string => process.env[name] || "";

const env: IEnv = {
  // amocrmSubdomain: envVar("AMOCRM_SUBDOMAIN"),
  // amocrmIntegrationId: envVar("AMOCRM_INTEGRATION_ID"),
  // amocrmIntegrationSecret: envVar("AMOCRM_INTEGRATION_SECRET"),
  // amocrmIntegrationRedirectUri: envVar("AMOCRM_INTEGRATION_REDIRECT_URI"),
  // amocrmAccessToken: envVar("AMOCRM_ACCESS_TOKEN"),
  // amocrmRefreshToken: envVar("AMOCRM_REFRESH_TOKEN"),
  // amocrmGoodsCatalogId: envVar("AMOCRM_GOODS_CATALOG_ID"),
  ecwidStoreId: envVar("ECWID_STORE_ID"),
  ecwidPublicToken: envVar("ECWID_PUBLIC_TOKEN"),
  ecwidSecretToken: envVar("ECWID_SECRET_TOKEN"),
  ecwidClientSecret: envVar("ECWID_CLIENT_SECRET"),
  ecwidAllowCorsUrl: envVar("ECWID_ALLOW_CORS_URL"),
  zeitToken: envVar("ZEIT_TOKEN"),
  zeitTeamId: envVar("ZEIT_TEAM_ID"),
  zeitAmocrmAccessTokenSecretName: "amocrm-access-token",
  zeitAmocrmRefreshTokenSecretName: "amocrm-refresh-token",
  telegramToken: envVar("TELEGRAM_TOKEN"),
  telegramChatId: envVar("TELEGRAM_CHAT_ID"), // TODO: un-hardcode this
  jsonbinSecret: envVar("JSONBIN_SECRET"),
  jsonbinBinId: envVar("JSONBIN_BIN_ID"),
  sentryDsn: envVar("SENTRY_DSN"),
};

export default env;
