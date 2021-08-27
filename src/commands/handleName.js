const Command = require('../structure/Command.js');

module.exports = new Command({
    name: 'harvesttime',
    description: 'Returns harvest time.',
    async run(message, args, client) {
        const hour = args[1];
        const minute = args[2];
        const dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        if(!hour || !minute) {
            return message.reply('Invalid command, the command need to have hour and minute. -harvesttime (hour) (minute) ex. harvesttime 34 23')
        }
        
        const thisTime = new Date();
        const thisHour = thisTime.getTime();
        const timeTobeAdded = (hour * 60 * 60 * 1000) + (minute * 60 * 1000);
        const timeTobeReply = new Date(thisHour + timeTobeAdded);

        const hourTobeReply = timeTobeReply.getHours() < 10 ? `0${timeTobeReply.getHours()}` : timeTobeReply.getHours() > 12 ? timeTobeReply.getHours() - 12 : timeTobeReply.getHours();
        const minuteTobeReply = timeTobeReply.getMinutes() < 10 ? `0${timeTobeReply.getMinutes()}` : timeTobeReply.getMinutes();
        const AMPM = timeTobeReply.getHours() < 12 ? 'AM' : 'PM';
        
        message.reply(`${dates[timeTobeReply.getDay() - 1]}, ${timeTobeReply.getDate()}/${timeTobeReply.getMonth() < 10 ? `0${timeTobeReply.getMonth() + 1}` : timeTobeReply.getMonth() + 1}/${timeTobeReply.getFullYear()} ${hourTobeReply}:${minuteTobeReply} ${AMPM}`)
    }
})