const { Markup } = require('telegraf');
const { getUser, updateUser } = require('./db/mongo');

async function menuKeyboard(ctx) {
    const message = ctx.message.text;
    const user = await getUser(ctx.from.id)
    if (user === null) {
        return Markup.keyboard([['❌ Получать уведомления']]).resize().oneTime();
    }
    if (user && message) {
        let text, update;
        if (message === '✔️ Получать уведомления') {
            update = await updateUser(ctx.from.id, 'false')
            text = '❌ Получать уведомления';
        } else {
            update = await updateUser(ctx.from.id, 'true');
            text = '✔️ Получать уведомления';
        }
        if (update) {
            return Markup.keyboard([[text]]).resize().oneTime();
        }
        return undefined;
    }
}

function ownerKeyboard() {
    const button = [
        {
            text: 'Принять',
            callback_data: 'owner_accept'
        },
        {
            text: 'Отклонить',
            callback_data: 'owner_remove'
        }
    ]
    return Markup.inlineKeyboard([button]);
}

module.exports = { menuKeyboard, ownerKeyboard };