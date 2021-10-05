const Command = require('../structure/Command.js');

const letterChecker = (time) => {
    const regExp = /[a-zA-Z]/g;

    if(regExp.test(time)) {
        return true;
    }

    return false;
}

module.exports = new Command({
    name: 'ht',
    description: 'Returns harvest from the given hour/s and minute/s. Example: -ht 30 30 or -ht 30:30',
    async run(message, args, client) {
        let hour;
        let minute;
        let dates = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        if(args.length === 2) {
            const splittedData = args[1].split(":");
            if(splittedData.length === 2) {
                hour = splittedData[0];
                minute = splittedData[1];
            }
        } else {
            hour = args[1];
            minute = args[2];
        }

        if(args.length > 3) {
            return message.reply('Invalid command, the command need to have hour and minute. -harvesttime (hour) (minute) ex. -ht 34 23 or -ht 34:23')
        }

        if(letterChecker(hour) || letterChecker(minute)) {
            return message.reply('Invalid type of time, please input numbers only.');
        }
        
        const thisTime = new Date();
        const thisHour = thisTime.getTime();
        const timeTobeAdded = (hour * 60 * 60 * 1000) + (minute * 60 * 1000);
        const timeTobeReply = new Date(thisHour + timeTobeAdded);

        if(!timeTobeAdded && timeTobeAdded !== 0) {
            return message.reply('Invalid command, the command need to have hour and minute. -harvesttime (hour) (minute) ex. -ht 34 23 or -ht 34:23')
        }

        const hourTobeReply = timeTobeReply.getHours() < 10 ? `0${timeTobeReply.getHours()}` : timeTobeReply.getHours() > 12 ? timeTobeReply.getHours() - 12 : timeTobeReply.getHours();
        const minuteTobeReply = timeTobeReply.getMinutes() < 10 ? `0${timeTobeReply.getMinutes()}` : timeTobeReply.getMinutes();
        const AMPM = timeTobeReply.getHours() < 12 ? 'AM' : 'PM';
        
        message.reply(`${dates[timeTobeReply.getDay()]}, ${timeTobeReply.getDate() < 10 ? `0${timeTobeReply.getDate()}` : timeTobeReply.getDate()}/${timeTobeReply.getMonth() < 9 ? `0${timeTobeReply.getMonth() + 1}` : timeTobeReply.getMonth() + 1}/${timeTobeReply.getFullYear()} ${hourTobeReply}:${minuteTobeReply} ${AMPM}`)
    }       
})