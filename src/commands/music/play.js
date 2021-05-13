const BaseCommand = require("../../utils/structures/BaseCommand");
const BaseEmbed = require("../../utils/structures/BaseEmbed");
module.exports = class PlayCommand extends BaseCommand {
    constructor () {
        super("play", "music");
        this.aliases = ["p"];
    }

    async run (client, message, args) {
        let isPlaying = client.player.isPlaying(message);
        let rickRoll = Math.floor((Math.random() * 200) + 1) == 69;

        let song;
        if (!isPlaying) {
            song = await client.player.play(message, {
                search: (rickRoll) ? "Never Gonna Give You Up" : args.join(' '),
                requestedBy: message.author
            });
        } else {
            song = await client.player.addToQueue(message, {
                search: (rickRoll) ? "Never Gonna Give You Up" : args.join(' '),
                requestedBy: message.author
            });
        }

        // If there were no errors the Player#songAdd event will fire and the song will not be null.
        if(song) console.log(`Started playing ${song.name}`);
    }
}