const config = require('./config/config.json');

const express = require('express');
const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
const { getUser, createUser } = require('./db/mongo');
const { startSynchronization } = require('./api/synchronization');
const { menuMessage, updateSubscribedMessage } = require('./messages/default');
const { mailing } = require('./messages/mailing');

const app = express();
const bot = new Telegraf(config.token);
module.exports.bot = bot;

mongoose.connect(config.mongo.url)

const PORT = process.env.port || 8000
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(PORT, () => console.log('Starting on port: ', PORT));

startSynchronization(bot);

bot.start(async (ctx) => {
    const userInDB = await getUser(ctx.from.id);
    if (!userInDB) {
      createUser(ctx.from.id);
    }
    return await menuMessage(ctx);
});

bot.command('menu', async (ctx) => {
  return await menuMessage(ctx);
})

bot.action('owner_accept', async (ctx) => {
  return mailing(bot);
})
bot.action('owner_remove', async (ctx) => {
  return ctx.reply('❌ Отменено');
})

bot.on('text', async (ctx) => {
  const message = ctx.message.text;
  if (message === '✔️ Получать уведомления' || message === '❌ Получать уведомления') {
    return await updateSubscribedMessage(ctx, message);
  }
});

bot.launch();