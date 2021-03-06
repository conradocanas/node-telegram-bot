const TelegramBot = require("node-telegram-bot-api");
const { getNFTPrice, getAllNFTsPrices } = require("./controllers/nfts");
const { getLastMarketPlant } = require("./controllers/pvu");
const keys = require("./keys");

// Telegram Bot Config
const telegramBotToken = "";
const bot = new TelegramBot(keys.telegramBotToken, { polling: true });

/////////////
// Telegram Bot Messages

bot.onText(/\/ayuda/, (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    `Comandos \n /precios \n /precio (nft) \n /plantabarata \n /abrazo (user) \n `
  );
});

bot.onText(/\/precio (.+)/, async (msg, match) => {
  const resp = match[1]; // capture params
  bot.sendMessage(
    msg.chat.id,
    `Precio ${resp.toUpperCase()}: ${await getNFTPrice(resp)} USD`
  );
});

bot.onText(/\/abrazo (.+)/, (msg) => {
  bot.sendMessage(msg.chat.id, `${resp} te estan mandando abrazos <3`);
});

bot.onText(/\/precios/, async (msg) => {
  bot.sendMessage(msg.chat.id, await getAllNFTsPrices());
});

bot.onText(/\/plantabarata/, async (msg) => {
  bot.sendMessage(msg.chat.id, await getLastMarketPlant(true));
});

//setInterval(getAllNFTsPrices, 3600000);
setInterval(getLastMarketPlant, Math.random() * (30000 - 20000) + 20000);

console.warn("Telegram BOT Running..")
