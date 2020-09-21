import MockAdapter from "axios-mock-adapter";
import Zeit from "./";

let zeit: Zeit;
let mock: MockAdapter;

beforeEach(() => {
  zeit = new Zeit({
    token: "token",
    teamId: "team_1234",
  });

  mock = new MockAdapter(zeit.axios);
});

test("GET /www/user", async () => {
  mock
    .onGet("https://api.zeit.co/www/user", {
      params: { teamId: "team_1234" },
      headers: {
        Authorization: "Bearer token",
      },
    })
    .reply(200, { user: { id: 1 } });

  const response = await zeit.getUser();
  expect(response).toEqual({ id: 1 });
});

test("POST /v2/now/secrets", async () => {
  mock.onAny().reply(config => {
    try {
      expect(config.method).toBe("post");
      expect(config.url).toBe("https://api.zeit.co/v2/now/secrets");
      expect(config.headers.Authorization).toEqual("Bearer token");
      expect(config.data).toEqual(
        `{"name":"red-button-token","value":"putin1234"}`,
      );
      return [200, { uid: "sec_1" }];
    } catch (e) {
      return [500];
    }
  });

  const response = await zeit.createSecret("red-button-token", "putin1234");
  expect(response).toEqual("sec_1");
});

test("DELETE /v2/now/secrets/:name", async () => {
  mock
    .onDelete("https://api.zeit.co/v2/now/secrets/red-button-token", {
      params: { teamId: "team_1234" },
      headers: {
        Authorization: "Bearer token",
      },
    })
    .reply(200, { uid: "sec_1" });

  const response = await zeit.deleteSecret("red-button-token");
  expect(response).toEqual("sec_1");
});
