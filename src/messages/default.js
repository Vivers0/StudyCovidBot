const { menuKeyboard } = require("../buttons");

async function menuMessage(ctx) {
    const keyboard = await menuKeyboard(ctx);
    const text = '👋 Добро пожаловать в *StudyCovidBot*!\n\nЯ буду уведомлять тебя о всех новостях Covid-19, в которых есть информация для школьников/студентов.\n\nЧтобы получать уведомления, нажми на кнопку снизу👇';
    return ctx.replyWithMarkdown(text, keyboard);
}
// FIXME if else
async function updateSubscribedMessage(ctx, message) {
    const keyboard = await menuKeyboard(ctx);
    let text;
    if (message === '✔️ Получать уведомления') {
        text = 'Теперь вы будете получать обновления';
    } else {
        text = 'Теперь вы НЕ будете получать обновления';
    }
    return ctx.reply(text, keyboard);
}

module.exports = { menuMessage, updateSubscribedMessage };
