import { Bot } from "../lib/bot";
import { Processor } from "../lib/processor";

const BOT_TOKEN = process.env.MOD_BOT_TOKEN;
const processor = new Processor();
const bot = new Bot(BOT_TOKEN, processor);

export async function handle(event) {
  if (!event.body) {
    console.error("invalid request", !!bot, !event.body);
    return { statusCode: 200, body: "ok" };
  }
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    console.error("invalid request body", e);
    return { statusCode: 200, body: "ok" };
  }
  const message = await bot.handleUpdate(body);
  if (!message) {
    return { statusCode: 200, body: "ok" };
  }
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: `${JSON.stringify(message)}!`,
  };
}
