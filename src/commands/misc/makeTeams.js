const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class MakeTeamsCommand extends BaseCommand {
    constructor () {
        super("maketeams", "misc");
        this.aliases = ["mt", "teams"];
        this.description = "Make teams of any size with given players.";
        this.usage = "`maketeams {player1, player2..}` or `maketeams {num of teams} {player1, player2..}`"
    }

    async run (client, message, args) {
        let numberOfTeams = 2;
        let players = args;

        if (!isNaN(Number(args[0]))) {
            numberOfTeams = Number(args[0]);
            players = args.slice(1);
        }
        players.sort(() => Math.random() - 0.5);

        let teams = new Array();
        const playersOnEachTeam = players.length / numberOfTeams;
        for (var i = 0; i < numberOfTeams; i++) {
            teams.push(players.slice(i*playersOnEachTeam, (i+1)*playersOnEachTeam));
        }

        teams.sort(function(a, b) {
            // ASC -> a.length - b.length
            // DESC -> b.length - a.length
            return b.length - a.length;
        });

        // Find a way to display the teams
        const embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor(process.env.LIGHT_BLUE)
        .setTitle("Made " + numberOfTeams + " teams from " + players.length + " players")

        let fields = new Array();
        for (i = 0; i < teams.length; i++) {
            const teamPlayers = teams[i];
            const n = i+1;

            let teamString = "";
            teamPlayers.forEach(p => teamString += (p + "\n"));

            const team = {
                name: "Team " + n,
                value: teamString,
                inline: true
            };

            fields.push(team);
        }
        embed.addFields(fields);
        message.channel.send(embed);
    }
}