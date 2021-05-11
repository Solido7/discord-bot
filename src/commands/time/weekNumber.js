const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class WeekNumberCommand extends BaseCommand {
    constructor () {
        super("weeknumber", "time");
        this.aliases = ["week"];
        this.description = "Get the current week number.";
    }

    async run (client, message, args) {
        message.channel.send(weekNumber());
    }
    
}

const MINUTE = 60000;
const WEEK = 604800000
const tzDiff = (first, second) => (first.getTimezoneOffset() - second.getTimezoneOffset()) * MINUTE

const weekNumber = (date = new Date()) => {
    // day 0 is monday
    const day = (date.getDay() + 6) % 7
    // get thursday of present week
    const thursday = new Date(date)
    thursday.setDate(date.getDate() - day + 3)
    // set 1st january first
    const firstThursday = new Date(thursday.getFullYear(), 0, 1)
    // if Jan 1st is not a thursday...
    if (firstThursday.getDay() !== 4) {
      firstThursday.setMonth(0, 1 + (11 /* 4 + 7 */ - firstThursday.getDay()) % 7)
    }
    const weekNumber = 1 + Math.floor((thursday - firstThursday + tzDiff(firstThursday, thursday)) / WEEK)
    return weekNumber
}   