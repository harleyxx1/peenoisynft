const Command = require('../structure/Command.js');
const LocalStorage = require('node-localstorage').LocalStorage;
const path = require('path');

/**
 * Responsible for saving channel.
 * 
 * @param {String} dir - String path where the localstorage saved.
 * @param {Object} message - The message received from discord.
 */
const checkServer = (dir, message) => {
    const localstorage = new LocalStorage(`${dir}/scratch`);
    const channelId = localstorage.getItem('channelId');

    if(channelId && channelId === message.channelId) {
        message.reply(`The bot is already set in this text channel you idiot.`);
    } else {
        localstorage.setItem('channelId', message.channelId);
        message.reply(`The bot will only reply and receive a message from this <#${message.channelId}> text channel.`);
    }
}

module.exports = new Command({
    name: 'set',
    description: 'Set where channel will bot only accept and reply message.',
    async run(message, args, client) {
        const dir = path.join(__dirname, '../config');

        checkServer(dir, message);
    }       
})