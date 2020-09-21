import MockAdapter from "axios-mock-adapter";
import AmoCRM from "./";
import { IAmoCRMDeal } from "./types";

let amocrm: AmoCRM;
let mock: MockAdapter;

beforeEach(() => {
  amocrm = new AmoCRM({
    subdomain: "subdomain",
    integrationId: "integration_id",
    integrationSecret: "integration_secret",
    integrationRedirectUri: "integration_redirect_uri",
    accessToken: "access_token",
    refreshToken: "refresh_token",
    goodsCatalogId: "goods_1234",
  });

  mock = new MockAdapter(amocrm.axios);
});

test("GET /api/v2/account", async () => {
  const expectedResponse = { id: 1 };
  mock
    .onGet("https://subdomain.amocrm.ru/api/v2/account", {
      params: { with: "users,pipelines" },
      headers: { Authorization: "Bearer access_token" },
    })
    .reply(200, expectedResponse);

  const response = await amocrm.getAccount(["users", "pipelines"]);
  expect(response).toEqual(expectedResponse);
});

test("GET /api/v2/catalog_elements", async () => {
  const element = [{ id: 1 }];
  const expectedResponse = { _embedded: { items: element } };
  mock
    .onGet("https://subdomain.amocrm.ru/api/v2/catalog_elements", {
      params: { catalog_id: "goods_1234" },
      headers: { Authorization: "Bearer access_token" },
    })
    .reply(200, expectedResponse);

  const response = await amocrm.getCatalogElements();
  expect(response).toEqual(element);
});

// eslint-disable-next-line
test("POST /api/v2/leads", async () => {
  const expectedDeal = {
    name: "dealName",
    created_at: 1573116509,
    updated_at: 1573116509,
    status_id: 22511620,
    responsible_user_id: 2903464,
    sale: 120,
    company_id: 22511614,
  };

  mock
    .onPost("https://subdomain.amocrm.ru/api/v2/leads", { add: [expectedDeal] })
    .reply(200);

  const response = await amocrm.postDeal(expectedDeal as IAmoCRMDeal);
});

test("POST /oauth2/access_token", async () => {
  const tokens = {
    token_type: "Bearer",
    expires_in: 12345,
    access_token: "access_token",
    refresh_token: "refresh_token",
  };

  mock
    .onPost("https://subdomain.amocrm.ru/oauth2/access_token")
    .reply(200, tokens);

  const response = await amocrm.refreshAccessToken();
  expect(response).toEqual(tokens);
});
