const LocalStorage = require('node-localstorage').LocalStorage;
const path = require('path');

/**
 * This function will check if the saved channel id is equal to channel id from message.
 * 
 * @param {Object} message - The message received from discord.
 * @returns Boolean
 */
const checkServer = (message) => {
    const dir = path.join(__dirname, '../config');
    const localstorage = new LocalStorage(`${dir}/scratch`);
    const channelId = localstorage.getItem('channelId');

    if(message.channelId !== channelId) {
        return true;
    }

    return false;
}

module.exports = checkServer;