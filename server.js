//@flow

/**
 * Clear all console first before using.
 */
console.clear();

/**
 * Require/Import every packages or components we need
 * for our project.
 */
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const rp = require('request-promise');
const Client = require('./src/structure/Client.js');
const Command = require('./src/structure/Command.js');
const http = require("http");
//end import.

/**
 * Put packages initialization here. 
 */
setInterval(function() {
    http.get("https://discordnft.herokuapp.com/");
}, 300000); // every 5 minutes (300000)

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
 
const client = new Client();

fs.readdirSync('./src/commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        /**
         * @type {Command}
         */
        const command = require(`./src/commands/${file}`);
        client.commands.set(command.name, command)
    })

//end initialization.

client.on('messageCreate', message => {
    //if prefix is not use lets return noting and end the function.
    if(!message.content.startsWith(process.env.prefix)) return;
    const splittedMessage = message.content.split(/ +/);
    const command = client.commands.find(command => command.name == splittedMessage[0].slice(1, splittedMessage[0].length));

    if(!command) return message.reply('There is no command like that you piece of shit.')
    
    command.run(message, splittedMessage, client);
})
/**
 * This is responsible for our bot login. 
 */
client.login(process.env.DISCORD_KEY)

app.use('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => console.log(`App is running in port ${port}`));