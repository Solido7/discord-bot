const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class DaysUntilCommand extends BaseCommand {
    constructor () {
        super("daysuntil", "time");
        this.aliases = ["days", "daysago"];
        this.description = "Shows amount of days until/since given date.";
        this.usage = "`daysuntil {dd.mm.yy}`. Accepted date formats: `mm.dd`, `mm.dd.yy`, `mm/dd`, etc..";
    }

    async run (client, message, args) {
        let dateInput = args[0];
        let dateArgs;

        if (dateInput.includes("/")) {
            dateArgs = dateInput.split("/");
        } else if (dateInput.includes(".")) {
            dateArgs = dateInput.split(".");
        }
        if (dateArgs.length < 2) return message.channel.send("Wrong usage");

        var date = dateArgs[0];
        var month = dateArgs[1];
        var year = (dateArgs[2] ? dateArgs[2] : new Date().getFullYear());

        var targetDate = new Date(`${month}/${date}/${year}`);
        var currentDate = new Date();

        if (!(targetDate instanceof Date && !isNaN(targetDate.valueOf()))) return message.channel.send("`" + dateInput + "` is not a valid date.\n");

        var diffInMilliseconds = targetDate.getTime() - currentDate.getTime();
        var diffInDays = diffInMilliseconds / (1000 * 3600 * 24);

        let resultString = "That's today yo dipshit";
        if (diffInDays < (-1)) resultString = `${targetDate.toDateString()} was ${Math.floor(diffInDays*-1)} ${(Math.floor(diffInDays*-1) == 1) ? "day" : "days"} ago`;
        if (diffInDays > 0) resultString = `${Math.ceil(diffInDays)} ${(Math.ceil(diffInDays) == 1) ? "day" : "days"} until ${targetDate.toDateString()}`;
        message.channel.send(resultString);
    }
    
}
