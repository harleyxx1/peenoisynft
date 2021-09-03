const Command = require('../structure/Command.js');

module.exports = new Command({
    name: 'pvulist',
    description: 'Returns list of nft helper commands.',
    async run(message, args, client) {
        const commands = client.commands;
        let messageToReply = 'NFTHelper list of commands.\n\n';

        commands.map(command => messageToReply += `-${command.name}: ${command.description}\n`);
        
        message.reply(messageToReply);
    }       
})