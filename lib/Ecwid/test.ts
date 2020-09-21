import MockAdapter from "axios-mock-adapter";
import Ecwid from "./";

let ecwid: Ecwid;
let mock: MockAdapter;

beforeEach(() => {
  ecwid = new Ecwid({
    storeId: "store_42",
    secretToken: "secret_token",
  });

  mock = new MockAdapter(ecwid.axios);
});

test("GET /profile", async () => {
  const expectedResponse = { id: 1 };

  mock
    .onGet("https://app.ecwid.com/api/v3/store_42/profile", {
      params: { token: "secret_token" },
    })
    .reply(200, expectedResponse);

  const response = await ecwid.profile();
  expect(response).toEqual(expectedResponse);
});

test("GET /orders/:id", async () => {
  const expectedResponse = { id: 1 };
  mock
    .onGet("https://app.ecwid.com/api/v3/store_42/orders/1", {
      params: { token: "secret_token" },
    })
    .reply(200, expectedResponse);

  const response = await ecwid.getOrderById(1);
  expect(response).toEqual(expectedResponse);
});

test("GET /orders", async () => {
  const expectedResponse = { id: 1 };
  mock
    .onGet("https://app.ecwid.com/api/v3/store_42/orders", {
      params: { token: "secret_token" },
    })
    .reply(200, expectedResponse);

  const response = await ecwid.orders();
  expect(response).toEqual(expectedResponse);
});

test("GET /orders (with params)", async () => {
  const request = {
    offset: 100,
    keywords: "yolka",
    createdFrom: 1574436080,
  };
  const expectedResponse = { id: 1 };
  mock
    .onGet("https://app.ecwid.com/api/v3/store_42/orders", {
      params: { token: "secret_token", ...request },
    })
    .reply(200, expectedResponse);

  const response = await ecwid.orders(request);
  expect(response).toEqual(expectedResponse);
});

test("GET /orders (all)", async () => {
  const expectedResponse = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 101 },
    { id: 102 },
  ];

  mock
    .onGet("https://app.ecwid.com/api/v3/store_42/orders", {
      params: { token: "secret_token", offset: 0 },
    })
    .reply(200, { items: [{ id: 1 }, { id: 2 }, { id: 3 }] });

  mock
    .onGet("https://app.ecwid.com/api/v3/store_42/orders", {
      params: { token: "secret_token", offset: 100 },
    })
    .reply(200, { items: [{ id: 101 }, { id: 102 }] });

  mock
    .onGet("https://app.ecwid.com/api/v3/store_42/orders", {
      params: { token: "secret_token", offset: 200 },
    })
    .reply(200, { items: [] });

  const response = await ecwid.ordersAll();
  expect(response).toEqual(expectedResponse);
});
