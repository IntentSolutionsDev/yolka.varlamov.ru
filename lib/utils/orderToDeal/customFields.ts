import { IEcwidOrder } from "../../../lib/Ecwid/types";
import {
  IAmoCRMCustomField,
  IAmoCRMCustomFields,
} from "../../../lib/AmoCRM/types";

// {fieldName: fieldId}
const generateFieldsMap = (fields: IAmoCRMCustomFields) => {
  const leadFields = Object.values(fields.leads);
  const entries = leadFields.map(field => [field.name, field.id]);

  return Object.fromEntries(entries);
};

const field = (id: number, value: string) => {
  return {
    id,
    values: [{ value }],
  };
};

enum paymentStatusMap {
  AWAITING_PAYMENT = "Ждёт оплаты",
  PAID = "Оплачен",
  CANCELLED = "Отменён",
  REFUNDED = "Полный возврат",
  PARTIALLY_REFUNDED = "Частичный возврат",
  INCOMPLETE = "Не завершён",
}

const generateCustomFields = (
  fields: IAmoCRMCustomFields,
  order: IEcwidOrder,
) => {
  const fieldsIdsMap = generateFieldsMap(fields);

  const orderNumber = field(
    fieldsIdsMap["Номер заказа"],
    order.orderNumber.toString(),
  );

  const paymentStatus = field(
    fieldsIdsMap["Статус оплаты"],
    paymentStatusMap[order.paymentStatus],
  );

  const orderComments = field(
    fieldsIdsMap["Комментарий клиента"],
    order.orderComments,
  );

  const orderType = field(fieldsIdsMap["Тип заказа"], "Заказ с сайта");

  return [orderNumber, paymentStatus, orderComments, orderType];
};

export default generateCustomFields;
