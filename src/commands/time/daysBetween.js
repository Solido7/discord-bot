const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class DaysBetweenCommand extends BaseCommand {
    constructor () {
        super("daysbetween", "time");
        this.aliases = ["between"];
        this.description = "Shows amount of days between two dates.";
        this.usage = "`daysbetween {dd.mm.yy} {dd.mm.yy}`. Accepted date formats: `mm.dd`, `mm.dd.yy`, `mm/dd`, etc..";
    }

    async run (client, message, args) {
        let dates = [];
        let str = "";

        args.forEach(d => {
            let inputArgs = [];

            if (d.includes("/")) inputArgs = d.split("/");
            if (d.includes(".")) inputArgs = d.split(".");
            if (inputArgs.length < 2) return str += ("`" + d + "` is not a valid date format.\n");

            inputArgs[2] = (inputArgs[2] ? inputArgs[2] : new Date().getFullYear());

            let date = new Date(`${inputArgs[1]}/${inputArgs[0]}/${inputArgs[2]}`);
            if (!(date instanceof Date && !isNaN(date.valueOf()))) return str += ("`" + d + "` is not a valid date.\n");

            dates.push(date);
        });

        if (dates.length < 2) return message.channel.send(str + "Not enough valid dates.");

        var firstDate = dates[0];
        var secondDate = dates[1];

        var diffInMilliseconds = firstDate.getTime() - secondDate.getTime();
        var diffInDays = diffInMilliseconds / (1000 * 3600 * 24);
        let printDiff = Math.ceil(Math.abs(diffInDays));

        let resultString = "Why u do this man..";
        if (diffInDays != 0) resultString = `There's ${printDiff} ${(printDiff == 1) ? "day" : "days"} between ${firstDate.toDateString()} and ${secondDate.toDateString()}`;

        message.channel.send(resultString);
    }
}
