const { getLastNews, getAllNotificationUser } = require("../db/mongo");
const config = require('../config/config.json');

async function mailing(bot) {
    const news = await getLastNews();
    const allUser = await getAllNotificationUser()
    if (news && allUser && allUser.length !== 0) {
        for (user of allUser) {
            const { userID } = user;
            const { title, description, url } = news
            const text = `[*${title}*](${url})\n\n${description}`;
            bot.telegram.sendMessage(userID, text, { parse_mode: 'Markdown' })
        }
        return bot.telegram.sendMessage(config.ownerID, '✅ Успешно!')
    }
    return bot.telegram.sendMessage(config.ownerID, '❌ Ошибка!')
}

module.exports = { mailing };
