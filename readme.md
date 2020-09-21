# Набор расширений для магазина Варламов.Ёлки

Документация: https://www.notion.so/gooditworks/2019-ced42ed667d54f9b9ebc04bc1d9de605

## Деплой

`now [--prod]`

Переменные:

```
AMOCRM_SUBDOMAIN
AMOCRM_INTEGRATION_ID
AMOCRM_INTEGRATION_SECRET
AMOCRM_INTEGRATION_REDIRECT_URI
AMOCRM_ACCESS_TOKEN
AMOCRM_REFRESH_TOKEN
AMOCRM_GOODS_CATALOG_ID
ECWID_STORE_ID
ECWID_PUBLIC_TOKEN
ECWID_SECRET_TOKEN
ECWID_CLIENT_SECRET
ZEIT_TOKEN
ZEIT_TEAM_ID
TELEGRAM_TOKEN
TELEGRAM_CHAT_ID
JSONBIN_SECRET
JSONBIN_BIN_ID
SENTRY_DSN
```

### Кастомизация витрины Ecwid

Настроить Ecwid Customize Storefront на `/public/storefront/script.js` и `/public/storefront/styles.css`.

### Интеграция Ecwid и AmoCRM

Настроить, чтобы веб-хуки Ecwid шли в `/api/webhook/ecwid`.
Настроить, чтобы запросы на обновление токена AmoCRM шли в `/api/refresh_amocrm_token`.

### Telegram-бот

Чтобы Telegram знал, на какой url слать веб-хуки, нужно выполнить `npm run set-telegram-webhook <baseUrl>` (например `npm run set-telegram-webhook yolki.gooditworks.now.sh`).
Это зарегистрирует webhook на `https://<baseUrl>/api/wenhook/telegram/<token>`.
Перед этим убедиться, чтобы в `.env` был токен от Telegram бота.

Также для ежедневной отправки /sales нужно настроить EasyCron. Запрос: на URL `/api/push_telegram_sales`, в body должен быть токен от Telegram, например:

```
curl -X POST https://yolki.gooditworks.now.sh/api/push_telegram_sales \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "token=1234567890:ABCDE"
```

### Формирование бланков заказов

TODO
