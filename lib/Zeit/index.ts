import axios, { AxiosInstance } from "axios";
import { IZeitConfig, IZeitUser } from "./types";

class ZeitAPI {
  config: IZeitConfig;
  axios: AxiosInstance;

  constructor(config: IZeitConfig) {
    this.config = config;

    this.axios = axios.create({
      baseURL: "https://api.zeit.co/",
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      params: {
        teamId: config.teamId,
      },
    });
  }

  async getUser(): Promise<IZeitUser> {
    const response = await this.axios.get("/www/user");

    return response.data.user as IZeitUser;
  }

  async createSecret(name: string, value: string): Promise<string> {
    const response = await this.axios.post("/v2/now/secrets", {
      name,
      value,
    });

    return response.data.uid;
  }

  async deleteSecret(name: string): Promise<string> {
    const url = `/v2/now/secrets/${name}`;
    const response = await this.axios.delete(url);

    return response.data.uid;
  }
}

export default ZeitAPI;
