import { chain } from "lodash";
import { IEcwidOrder } from "./types";
import { IDatabase } from "../../lib/JsonBin";

const treesCountInOrder = (order: IEcwidOrder, db: IDatabase): number =>
  order.items
    .filter(item => db.treesSku.includes(item.sku))
    .map(item => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);

const treesTotal = (order: IEcwidOrder, db: IDatabase): number =>
  order.items
    .filter(item => db.treesSku.includes(item.sku))
    .map(item => item.price * item.quantity)
    .reduce((total, subtotal) => total + subtotal, 0);

const isFreeOrder = (order: IEcwidOrder): boolean => {
  const coupon = order.discountCoupon ?? {};
  const { discount, status, discountType } = coupon;

  return (
    discount === 100 &&
    status === "ACTIVE" &&
    (discountType === "PERCENT" || discountType === "PERCENT_AND_SHIPPING")
  );
};

const freeTreesByCoupon = (
  orders: IEcwidOrder[],
  code: string,
  db: IDatabase,
): number =>
  chain(orders)
    .filter(isFreeOrder)
    .filter(order => order.discountCoupon?.code?.startsWith(code))
    .map(order => treesCountInOrder(order, db))
    .sum()
    .value();

export { treesCountInOrder, treesTotal, isFreeOrder, freeTreesByCoupon };
