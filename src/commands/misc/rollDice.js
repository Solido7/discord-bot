const BaseCommand = require("../../utils/structures/BaseCommand");
const BaseEmbed = require("../../utils/structures/BaseEmbed");

module.exports = class RollDiceCommand extends BaseCommand {
    constructor () {
        super("rolldice", "misc");
        this.aliases = ["rd", "roll"];
        this.description = "Roll dice up to 50 times. The die can have more/less than 6 sides.";
        this.usage = "`rolldice {num of rolls}` or `rolldice {num of rolls} {num of sides}`"
    }

    async run (client, message, args) {
        let numberOfDice = 1;
        let numberOfSides = 6;

        if (!isNaN(Number(args[0]))) numberOfDice = Number(args[0]);
        if (!isNaN(Number(args[1]))) numberOfSides = Number(args[1]);
        if (numberOfDice > 50) numberOfDice = 50;

        let rolledDice = new Array();
        for (var i = 0; i < numberOfDice; i++) {
            const roll = Math.ceil(Math.random() * numberOfSides);
            rolledDice.push(roll);
        }

        const embed = new BaseEmbed(client, message.guild.id);

        if (numberOfDice == 1) {
            embed.setTitle("Rolling a " + numberOfSides + "-sided die");
            if (numberOfSides == 6) embed.setTitle("Rolling a die");
        } else {
            embed.setTitle("Rolling a " + numberOfSides + "-sided die " + numberOfDice + " times");
            if (numberOfSides == 6) embed.setTitle("Rolling a die " + numberOfDice + " times");
        }


        let diceString = "";
        rolledDice.forEach(d => diceString += (d + "\n"));
        embed.setDescription(diceString);

        message.channel.send(embed);
    }
}