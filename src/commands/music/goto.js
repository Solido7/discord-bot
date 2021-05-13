const BaseCommand = require("../../utils/structures/BaseCommand");
const WrongUsage = require("../../utils/WrongUsage");
const { Utils } = require("discord-music-player");

module.exports = class PlayCommand extends BaseCommand {
    constructor () {
        super("goto", "music");
        this.alises = ["seek"];
        this.description = "Skip to x time/seconds into the song";
        this.usage = "`_PREFIX_goto {seconds}` or `_PREFIX_goto {m:s}`";
    }

    async run (client, message, args) {
        let isPlaying = client.player.isPlaying(message);
        if (!isPlaying) return message.channel.send("No music is being played");
        if (args.length < 1) return message.channel.send(new WrongUsage(client, message.guild.id, this, "No timestamp/seconds provided."));

        let time;
        let songDuration = Utils.TimeToMilliseconds(client.player.nowPlaying(message).duration);
        if (args[0].includes(":")) {
            time = Utils.TimeToMilliseconds(args.join());
        } else {
            time = args[0] * 1000;
        }
        if (time > songDuration || time < 0) return message.channel.send("Song does not have such timestamp.");

        let song = await client.player.seek(message, parseInt(time)).catch(err => {
            return message.channel.send(error.message);
        });
        
        let string;
        if (args[0].includes(":")) {
            string = `Seeked to ${args[0]} of ${song.name}`;
        } else {
            string = `Seeked to ${args[0]} seconds of ${song.name}`;
        }
        message.channel.send(string);
    }
}