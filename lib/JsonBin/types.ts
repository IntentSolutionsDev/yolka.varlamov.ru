interface IJsonBinConfig {
  secret: string;
  binId: string;
}

interface IPlanPerHour {
  hour: number;
  percent: number;
}

interface IDatabase {
  admins: string[];
  avtormediaCoupon: string;
  avtormediaTreeSku: string;
  treesSku: string[];
  extrasSku: string[];
  treesMaxCount: { [key: string]: number };
  extrasMaxCount: { [key: string]: number };
  productAliases: { [key: string]: string };
  paymentMethodAliases: { [key: string]: string };
  citiesAliases: { [key: string]: string };
  planPerDay: { [key: string]: number };
  planPerHour: IPlanPerHour[];
  bloggers: { [key: string]: number };
  lastOrderNumber: number;
  pushedCancels: number[];
}

export { IJsonBinConfig, IDatabase };
