const User = require('./schemes/User');
const News = require('./schemes/News')

async function getUser(userID) {
    const data = await User.findOne({ userID });
    if (data && data.userID) {
        return data;
    }
    return null;
}

function createUser(userID) {
    const data = new User({ userID })
    return data.save();
}

async function getLastNews() {
    const data = await News.findOne().sort({$natural:-1}).limit(1);
    return data;
}

function createNews(newsParameters) {
    const data = new News(newsParameters);
    return data.save();
}

async function updateUser(userID, type) {
    if (userID && type) {
        const user = await getUser(userID)
        if (user) {
            const data = type === 'true' 
                ? await User.findOneAndUpdate({ userID }, { isSubscribe: false }) 
                : await User.findOneAndUpdate({ userID }, { isSubscribe: true });
            return data;
        }
        return null;
    }
    return undefined;
}

async function getAllNotificationUser() {
    const data = await User.find({ isSubscribe: true })
    return data;
}


module.exports = { getUser, createUser, getLastNews, createNews, updateUser, getAllNotificationUser };