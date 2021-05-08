const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class DaysUntilCommand extends BaseCommand {
    constructor () {
        super("daysuntil", "misc");
        this.aliases = ["daysbetween", "days"];
    }

    async run (client, message, args) {
        let dateInput = args[0];
        var dateString = dateInput.split("/").join("").split(".").join("");

        var date = dateString.slice(0, 2);
        var month = dateString.slice(2, 4);
        var year = dateString.slice(4);

        var targetDate = new Date(`${month}/${date}/${year}`);
        var currentDate = new Date();

        var diffInMilliseconds = targetDate.getTime() - currentDate.getTime();
        var diffInDays = diffInMilliseconds / (1000 * 3600 * 24);

        let resultString = "That's today yo dipshit";
        if (diffInDays < (-1)) resultString = `${targetDate.toDateString()} was ${Math.floor(diffInDays*-1)} day(s) ago`;
        if (diffInDays > 0) resultString = `${Math.ceil(diffInDays)} day(s) until ${targetDate.toDateString()}`;
        message.channel.send(resultString);
    }
    
}
