const { model, Schema } = require('mongoose')

const User = new Schema({
    userID: { type: String, required: true, },
    isSubscribe: { type: Boolean, default: false, },
    language: { type: String, default: 'ru', },
});

module.exports = model('User', User);