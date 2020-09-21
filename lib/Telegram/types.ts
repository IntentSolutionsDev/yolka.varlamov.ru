import { IncomingMessage, ServerResponse } from "http";
import { ContextMessageUpdate } from "telegraf";
import { IDatabase } from "../../lib/JsonBin";

interface ITelegramConfig {
  token: string;
  chatId: string;
}

type WebhookHandler = (
  request: IncomingMessage,
  response: ServerResponse,
) => any;

interface ITelegramContext extends ContextMessageUpdate {
  database: IDatabase;
}

export { ITelegramConfig, WebhookHandler, ITelegramContext };
