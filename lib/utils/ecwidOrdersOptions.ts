const november = Math.floor(Date.UTC(2019, 10, 29) / 1000);

const ordersOptions = {
  createdFrom: november,
  paymentStatus: ["AWAITING_PAYMENT", "PAID"].join(","),
  fulfillmentStatus: [
    "AWAITING_PROCESSING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "READY_FOR_PICKUP",
  ].join(","),
};

export default ordersOptions;
