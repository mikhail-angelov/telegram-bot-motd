# Small telegram bot

This is minimal telegram bot, deployed for serverless lambdas

> before deployment, make sure rename .env.sample to .env and update environment variables for your bot

## Build bot

> make sure you have Node.js 14+ is installed

- `npm i`
- `npm run build`

## Deploy to [vercel](https://vercel.com)

- make sure vercel cli is installed and you logged in to vercel cloud
- run `make vercel` to deploy lambda
- run `make register` to register telegram bot webhook

## Deploy to [yandex cloud function](https://cloud.yandex.ru)

- make sure [yc cli](https://cloud.yandex.ru/docs/cli/quickstart) is set up
- run `make yandex`
- run `make register` to register telegram bot webhook

## Live: @SmartyMotdBot