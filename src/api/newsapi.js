const NewsAPI = require('newsapi');
const config = require('../config/config.json');

const newsapi = new NewsAPI(config.newsapi.api);

async function getNews() {
    const today = new Date().toJSON().slice(0,10);
    const yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toJSON().slice(0,10);
    const response = newsapi.v2.everything({
        q: config.newsapi.query,
        from: yesterday,
        to: '2020-10-15',
        language: 'ru',
        sortBy: 'publishedAt'
    })       
    return response;
}

module.exports = { getNews };