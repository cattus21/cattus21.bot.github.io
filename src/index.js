require("dotenv").config();

const { Telegraf, Markup } = require("telegraf");
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}
const bot = new Telegraf(token);
// main stage

const data = {
  "π‘": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/angry.cat1.jpg?raw=true",

    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/angry.cat2.jpg?raw=true",
  ],

  "π­": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/sad.cat.jpg?raw=true",

    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/sad.cat1.jpg?raw=true",
  ],

  "π": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/ok.jpg?raw=true",
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/ok1.jpg?raw=true",
  ],

  "β€οΈ": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/love.jpg?raw=true",
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/love2.jpg?raw=true",
  ],

  "β­": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/star.jpg?raw=true",
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/star1.jpg?raw=true",
  ],

  "π": [
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/hehe.jpg?raw=true",
    "https://github.com/cattus21/cattus21.bot.github.io/blob/main/images/hehe1.jpg?raw=true",
  ],
};

const emotions = Object.keys(data);
const emojiKeyboard = emotions.reduce(
  (rows, key, index) =>
    (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
    rows,
  ["π‘", "π­", "π", "β€οΈ", "β­", "π"]
);

const emojiTriggers = new RegExp(emotions.join("|"));

try {
  bot.hears(emojiTriggers, async (ctx) => {
    const cats_for_emoji = data[ctx.message.text];
    const random_cat_url =
      cats_for_emoji[Math.floor(Math.random() * cats_for_emoji.length)];

    await ctx.reply("Π―ΠΊΡΠΎ " + ctx.message.text + ", ΡΠΎ: ");

    return await ctx.replyWithPhoto(random_cat_url);
  });

  bot.on("message", async (ctx) => {
    return await ctx.reply(
      "ΠΠ±Π΅ΡΠΈ Π΅ΠΌΠΎΡΡΡ:",
      Markup.keyboard(["π‘", "π­", "π", "β€οΈ", "β­", "π"]).resize()
    );
  });
} catch (error) {
  console.log(error);
}

// footer
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
