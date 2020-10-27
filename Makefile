include .env


register:
	curl -F "url=${LAMBDA_URL}" https://api.telegram.org/bot${MOD_BOT_TOKEN}/setWebhook

unregister:
	curl https://api.telegram.org/bot${MOD_BOT_TOKEN}/deleteWebhook

vercel:
	npm run build
	vercel

yandex-init: 
	yc serverless function create --name=telegram-bot-motd
	yc serverless function allow-unauthenticated-invoke telegram-bot-motd

yandex: 
	npm run build:yandex
	cd dist; zip telegram-bot-motd.zip index.js
	cd dist; yc serverless function version create \
	--function-name=telegram-bot-motd \
	--runtime nodejs12 \
	--entrypoint index.handle \
	--memory 128m \
	--execution-timeout 5s \
	--source-path ./telegram-bot-motd.zip
