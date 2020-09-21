import Telegraf from "telegraf";
import context from "../../lib/context";
import { IDatabase } from "../../lib/JsonBin";
import ecwidOrdersOptions from "../../lib/utils/ecwidOrdersOptions";
import { IEcwidOrder } from "../../lib/Ecwid/types";
import errorHandler from "../../lib/utils/errorHandler";
import { databaseMiddleware, authMiddleware } from "./middlewares";
import { ITelegramConfig, WebhookHandler, ITelegramContext } from "./types";
import { formatOrder } from "./format";

import start from "./commands/start";
import cities from "./commands/cities";
import sales, { formatMessage as formatSales } from "./commands/sales";
import goods from "./commands/goods";
import goods2 from "./commands/goods2";
import extras from "./commands/extras";
import goodsfree from "./commands/goodsfree";
import coupons from "./commands/coupons";
import dayplan from "./commands/dayplan";
import bloggersStart from "./commands/bloggersStart";
import bloggersStop from "./commands/bloggersStop";
import newgoods from "./commands/newgoods";

const onError = async (error: Error, ctx: ITelegramContext) => {
  const tags = {
    tgChatId: ctx.chat?.id,
    tgUsername: ctx.from?.username,
    tgText: ctx.message?.text,
  };
  await errorHandler(error, tags);

  return ctx.replyWithMarkdown(`Ошибка: \`${error.message}\``);
};

class Telegram {
  chatId: string;
  webhookUrl: string;
  telegraf: Telegraf<ITelegramContext>;

  constructor(config: ITelegramConfig) {
    this.chatId = config.chatId;
    this.webhookUrl = `/api/webhook/telegram/${config.token}`;

    this.telegraf = new Telegraf(config.token);
    this.telegraf.use(databaseMiddleware, authMiddleware);
    this.telegraf.catch(onError);

    this.telegraf.command("start", start);
    this.telegraf.command("cities", cities);
    this.telegraf.command("sales", sales());
    this.telegraf.command("sales100", sales("100001"));
    this.telegraf.command("sales125", sales("100002"));
    this.telegraf.command("sales150", sales("100003"));
    this.telegraf.command("sales175", sales("100004"));
    this.telegraf.command("sales200", sales("100005"));
    this.telegraf.command("sales225", sales("100006"));
    this.telegraf.command("goodssales", goods);
    this.telegraf.command("goods", newgoods);
    this.telegraf.command("goods2", goods2);
    this.telegraf.command("extras", extras);
    this.telegraf.command("goodsfree", goodsfree);
    this.telegraf.command("coupons", coupons);
    this.telegraf.command("dayplan", dayplan);
    this.telegraf.command("bloggers_start", bloggersStart);
    this.telegraf.command("bloggers_stop", bloggersStop);
  }

  webhookCallback(): WebhookHandler {
    return this.telegraf.webhookCallback(this.webhookUrl);
  }

  setWebhook(baseUrl: string): Promise<any> {
    const fullUrl = `https://${baseUrl}${this.webhookUrl}`;

    return this.telegraf.telegram.setWebhook(fullUrl);
  }

  async pushEcwidOrder(order: IEcwidOrder, db: IDatabase): Promise<any> {
    const { orderNumber } = order;

    if (orderNumber <= db.lastOrderNumber) {
      return Promise.resolve();
    }

    const text = formatOrder(order, db, false, false);
    await this.telegraf.telegram.sendMessage(this.chatId, text);

    const newDb = { ...db, lastOrderNumber: orderNumber };
    await context.jsonBin.set(newDb);

    const promoCode = order.discountCoupon?.code;
    const bloggerChatId = db.bloggers[promoCode];
    if (bloggerChatId) {
      const text = formatOrder(order, db, false, true);
      await this.telegraf.telegram.sendMessage(bloggerChatId, text);
    }

    return Promise.resolve();
  }

  async pushEcwidCancel(order: IEcwidOrder, db: IDatabase): Promise<any> {
    const { orderNumber } = order;

    if (db.pushedCancels.includes(orderNumber)) {
      return Promise.resolve();
    }

    const text = formatOrder(order, db, true, false);
    await this.telegraf.telegram.sendMessage(this.chatId, text);

    const newDb = {
      ...db,
      pushedCancels: [...db.pushedCancels, orderNumber],
    };
    await context.jsonBin.set(newDb);

    return Promise.resolve();
  }

  async pushSales(): Promise<any> {
    const db = await context.jsonBin.get();
    const orders = await context.ecwidApi.ordersAll(ecwidOrdersOptions);

    const text = formatSales(orders, db);
    const options = { parse_mode: "Markdown" as const };

    await this.telegraf.telegram.sendMessage(this.chatId, text, options);
  }
}

export default Telegram;
