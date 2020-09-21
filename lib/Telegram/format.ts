import { IDatabase } from "../../lib/JsonBin";
import { IEcwidOrder } from "../../lib/Ecwid/types";
import { treesCountInOrder } from "../../lib/Ecwid/utils";
import { aliasPaymentMethod, aliasProductName, formatMoney } from "./utils";

const formatOrder = (
  order: IEcwidOrder,
  db: IDatabase,
  isCancel: boolean,
  isBlogger: boolean,
): string => {
  const paymentMethod = aliasPaymentMethod(order.paymentMethod, db);
  const header = isCancel
    ? `❌ Замена или бесплатная ёлка - #${order.orderNumber}`
    : `Новая покупка (${paymentMethod}) - #${order.orderNumber}`;

  const treesCount = `Количество ёлок: ${treesCountInOrder(order, db)}`;

  const itemsHeader = "Состав заказа: ";
  const items = order.items
    .map(item => `— ${aliasProductName(item, db)} ${item.quantity}шт`)
    .join("\n");

  const shipping = order.shippingOption.shippingMethodName;

  const total = formatMoney(order.total);
  const discount = formatMoney(order.couponDiscount);
  const shippingRate = formatMoney(order.shippingOption.shippingRate);
  const totalLine = `Итого: ${total} (скидка ${discount}, доставка ${shippingRate})`;

  const coupon = order.discountCoupon
    ? `Купон: ${order.discountCoupon.name}`
    : "";

  const name = isBlogger ? "" : `Имя: ${order.shippingPerson.name}`;
  const tel = isBlogger ? "" : `Телефон: ${order.shippingPerson.phone}`;

  const lines = [
    header,
    treesCount,
    itemsHeader,
    items,
    shipping,
    " ",
    totalLine,
    coupon,
    name,
    tel,
  ];

  return lines.filter(Boolean).join("\n");
};

export { formatOrder };
