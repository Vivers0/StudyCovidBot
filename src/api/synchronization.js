const { setIntervalAsync } = require('set-interval-async/dynamic');
const { getLastNews, createNews } = require('../db/mongo');
const { sendOwner } = require('../messages/owner');
const { getNews } = require('./newsapi');

async function synchronization(bot) {
    const data = await getNews();
    const lastNews = data.articles[0];
    const lastNewsInDB = await getLastNews();
    if (!lastNewsInDB) {
        return sendOwner(bot, createNews({
            title: lastNews.title,
            description: lastNews.description,
            publishedAt: lastNews.publishedAt,
            url: lastNews.url
        }));
    }
    if (lastNews.title !== lastNewsInDB.title && lastNews.publishedAt !== lastNewsInDB.publishedAt) {
        console.log('require', bot)
        return sendOwner(bot, createNews({
            title: lastNews.title,
            description: lastNews.description,
            publishedAt: lastNews.publishedAt,
            url: lastNews.url
        }));
    }
    return;
}

async function startSynchronization(bot) {
    return setIntervalAsync(() => synchronization(bot), 30000);
}

module.exports = { startSynchronization };