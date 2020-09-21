import { IEcwidOrderItem } from "../../../lib/Ecwid/types";
import { IAmoCRMCatalogElement } from "../../../lib/AmoCRM/types";

const findSku = (element: IAmoCRMCatalogElement) => {
  const skuField = element.custom_fields.find(
    field => field.name === "Артикул",
  );

  if (skuField && skuField.values && skuField.values[0]) {
    return skuField.values[0].value;
  }

  return null;
};

// {sku: AmocrmCatalogId}
const generateSkuMap = (catalog: IAmoCRMCatalogElement[]) => {
  const entries = catalog.map(element => [findSku(element), element.id]);

  return Object.fromEntries(entries);
};

const generateCatalogElements = (
  catalog: IAmoCRMCatalogElement[],
  orderItems: IEcwidOrderItem[],
) => {
  const amoSkuMap = generateSkuMap(catalog);
  const entries = orderItems.map(orderItem => {
    const amoElementId = amoSkuMap[orderItem.sku];
    const { quantity } = orderItem;

    return [amoElementId, quantity];
  });

  return Object.fromEntries(entries);
};

export default generateCatalogElements;
