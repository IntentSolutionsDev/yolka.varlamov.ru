import axios, { AxiosInstance } from "axios";
import { set } from "lodash/fp";
import {
  IAmoCRMConfig,
  IAmoCRMAccount,
  IAmoCRMCatalogElement,
  IAmoCRMDeal,
  IAmoCRMPipeline,
  IAmoCRMTokens,
} from "./types";

class AmoCRM {
  config: IAmoCRMConfig;
  axios: AxiosInstance;

  constructor(config: IAmoCRMConfig) {
    this.config = config;
    this.axios = axios.create({
      baseURL: `https://${config.subdomain}.amocrm.ru/`,
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
    });
  }

  async getAccount(sections: string[] = []): Promise<IAmoCRMAccount> {
    const response = await this.axios.get("/api/v2/account", {
      params: {
        with: sections.join(","),
      },
    });

    return response.data as IAmoCRMAccount;
  }

  async getCatalogElements(): Promise<IAmoCRMCatalogElement[]> {
    const response = await this.axios.get("/api/v2/catalog_elements", {
      params: {
        catalog_id: this.config.goodsCatalogId,
      },
    });

    return response.data._embedded.items as IAmoCRMCatalogElement[];
  }

  async postDeal(deal: IAmoCRMDeal): Promise<void> {
    const response = await this.axios.post("/api/v2/leads", {
      add: [deal],
    });
  }

  async refreshAccessToken(): Promise<IAmoCRMTokens> {
    const response = await this.axios.post("/oauth2/access_token", {
      client_id: this.config.integrationId,
      client_secret: this.config.integrationSecret,
      redirect_uri: this.config.integrationRedirectUri,
      refresh_token: this.config.refreshToken,
      grant_type: "refresh_token",
    });

    return response.data as IAmoCRMTokens;
  }
}

export default AmoCRM;
