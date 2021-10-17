const { ownerKeyboard } = require('../buttons');
const config = require('../config/config.json');

async function sendOwner(bot, newsPromise) {
    const news = await newsPromise;
    if (news && news.title && news.description && news.publishedAt && news.url) {
        const keyboard = ownerKeyboard();
        const text = `*${news.title}*\n\n${news.description}\n\n[Link](${news.url}\n)`;
        return bot.telegram.sendMessage(config.ownerID, text, { parse_mode: 'Markdown', reply_markup: keyboard.reply_markup })
    }
}

module.exports = { sendOwner };
 