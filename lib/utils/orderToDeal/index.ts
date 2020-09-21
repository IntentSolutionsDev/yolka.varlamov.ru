import env from "../../../lib/env";
import context from "../../../lib/context";
import { IEcwidOrder } from "../../../lib/Ecwid/types";
import { IAmoCRMDeal, IAmoCRMCustomFields } from "../../../lib/AmoCRM/types";
import generateCatalogElements from "./catalogElements";
import generateCustomFields from "./customFields";

const formatDealName = (order: IEcwidOrder): string => {
  const { orderNumber } = order;
  const { shippingMethodName } = order.shippingOption;
  const { name } = order.shippingPerson;

  return `#${orderNumber} / ${shippingMethodName} / ${name}`;
};

const orderToDeal = async (order: IEcwidOrder): Promise<IAmoCRMDeal> => {
  const account = await context.amocrmApi.getAccount(["custom_fields"]);
  const catalog = await context.amocrmApi.getCatalogElements();

  const catalogElements = generateCatalogElements(catalog, order.items);
  const customFields = generateCustomFields(
    account._embedded.custom_fields as IAmoCRMCustomFields, // TODO: fix type
    order,
  );

  return {
    name: formatDealName(order),
    created_at: order.createTimestamp,
    updated_at: order.createTimestamp,
    sale: order.total,
    company_id: account.id,
    responsible_user_id: account.current_user,
    custom_fields: customFields,
    catalog_elements_id: {
      [env.amocrmGoodsCatalogId]: catalogElements,
    },
  };
};

export default orderToDeal;
