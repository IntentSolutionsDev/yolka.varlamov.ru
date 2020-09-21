import { IEcwidOrderItem, IEcwidProduct } from "../../lib/Ecwid/types";
import { IDatabase } from "../../lib/JsonBin";

const aliasProductName = (
  product: IEcwidOrderItem | IEcwidProduct,
  db: IDatabase,
): string => {
  if (db.productAliases[product.sku]) {
    return db.productAliases[product.sku];
  }

  return product.name;
};

const aliasPaymentMethod = (method: string, db: IDatabase): string => {
  if (db.paymentMethodAliases[method]) {
    return db.paymentMethodAliases[method];
  }

  return method;
};

const formatMoney = (amount: number): string => {
  const spaced = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return `${spaced}₽`;
};

export { aliasProductName, aliasPaymentMethod, formatMoney };
