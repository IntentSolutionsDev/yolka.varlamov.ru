import axios, { AxiosInstance } from "axios";
import { IJsonBinConfig, IDatabase } from "./types";

class JsonBin {
  axios: AxiosInstance;

  constructor(config: IJsonBinConfig) {
    this.axios = axios.create({
      baseURL: `https://api.jsonbin.io/b/${config.binId}/`,
      headers: {
        "secret-key": config.secret,
        "Content-Type": "application/json",
      },
    });
  }

  async get(): Promise<IDatabase> {
    const response = await this.axios.get("/latest");

    return response.data as IDatabase;
  }

  async set(data: any): Promise<IDatabase> {
    const response = await this.axios.put("/", data);

    return response.data.data as IDatabase;
  }
}

export { IDatabase };
export default JsonBin;
