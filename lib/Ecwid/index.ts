import axios, { AxiosInstance } from "axios";
import spex from "spex";
import { flatten } from "lodash";
import {
  IEcwidConfig,
  IEcwidOrder,
  IEcwidProfile,
  IEcwidOrdersRequest,
  IEcwidOrdersResponse,
  IEcwidProduct,
} from "./types";

const spexPromise = spex(Promise);

class EcwidAPI {
  config: IEcwidConfig;
  axios: AxiosInstance;

  constructor(config: IEcwidConfig) {
    this.config = config;
    this.axios = axios.create({
      baseURL: `https://app.ecwid.com/api/v3/${this.config.storeId}`,
      params: {
        token: config.secretToken,
      },
    });
  }

  async profile(): Promise<IEcwidProfile> {
    const response = await this.axios.get("/profile");

    return response.data as IEcwidProfile;
  }

  async getOrderById(id: number): Promise<IEcwidOrder> {
    const response = await this.axios.get(`/orders/${id}`);

    return response.data as IEcwidOrder;
  }

  async orders(
    params: IEcwidOrdersRequest = {},
  ): Promise<IEcwidOrdersResponse> {
    const response = await this.axios.get("/orders", { params });

    return response.data as IEcwidOrdersResponse;
  }

  async ordersAll(params: IEcwidOrdersRequest = {}): Promise<IEcwidOrder[]> {
    const source = (index: number) => {
      const fullParams = { ...params, offset: index * 100 };

      return this.orders(fullParams).then(response => {
        if (response.items.length) {
          return response.items;
        }

        return undefined;
      });
    };

    return spexPromise
      .sequence(source, { track: true })
      .then(orders => flatten(orders as IEcwidOrder[][]));
  }

  async products(): Promise<IEcwidProduct[]> {
    const response = await this.axios.get("/products");

    return response.data.items as IEcwidProduct[];
  }
}

export default EcwidAPI;
