require("dotenv").config();

const { Telegraf, Markup } = require("telegraf");
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}
const bot = new Telegraf(token);
// main stage

const data = {
  "😡": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/angry.cat1.jpg?raw=true",

    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/angry.cat2.jpg?raw=true",
  ],

  "😭": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/sad.cat.jpg?raw=true",

    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/sad.cat1.jpg?raw=true",
  ],

  "👍": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/ok.jpg?raw=true",
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/ok1.jpg?raw=true",
  ],

  "❤️": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/love.jpg?raw=true",
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/love2.jpg?raw=true",
  ],

  "⭐": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/star.jpg?raw=true",
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/star1.jpg?raw=true",
  ],

  "😂": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/hehe.jpg?raw=true",
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/hehe1.jpg?raw=true",
  ],
};

const emotions = Object.keys(data);
const emojiKeyboard = emotions.reduce(
  (rows, key, index) =>
    (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
    rows,
  ["😡", "😭", "👍", "❤️", "⭐", "😂"]
);

const emojiTriggers = new RegExp(emotions.join("|"));

bot.hears(emojiTriggers, async (ctx) => {
  const cats_for_emoji = data[ctx.message.text];
  const random_cat_url =
    cats_for_emoji[Math.floor(Math.random() * cats_for_emoji.length)];

  await ctx.reply("Якщо " + ctx.message.text + ", то: ");

  await ctx.replyWithPhoto(random_cat_url);
});

bot.on("message", async (ctx) => {
  await ctx.reply(
    "Обери емоцію:",
    Markup.keyboard(["😡", "😭", "👍", "❤️", "⭐", "😂"]).resize()
  );
});

// footer
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
