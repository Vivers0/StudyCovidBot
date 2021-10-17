const { model, Schema } = require('mongoose')

const News = new Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    publishedAt: { type: Date, required: true, },
    url: { type: String, required: true, }
});

module.exports = model('News', News);