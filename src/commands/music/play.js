const BaseCommand = require("../../utils/structures/BaseCommand");
const BaseEmbed = require("../../utils/structures/BaseEmbed");

module.exports = class PlayCommand extends BaseCommand {
    constructor () {
        super("play", "music");
        this.aliases = ["p"];
    }

    async run (client, message, args) {
        let queue = client.player.getQueue(message.guild.id);
        let authorChannel = message.guild.members.cache.get(message.author.id).voice.channel;
        if (queue && queue.connection.channel != authorChannel) return message.channel.send("I'm already playing in different channel");

        let rickRoll = Math.floor((Math.random() * 200) + 1) == 69;
        if (rickRoll) args = ["Rick", "Astley", "Never", "Gonna", "Give", "You", "Up"];

        if (!queue) {
            queue = client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel); 
        }

        let song;
        try {
            song = await queue.play(args.join(' '), {
                data: {
                    requester: message.author,
                    requestMessage: message
                }
            });
        } catch (e) {}

        try {
            song = await queue.playlist(args.join(' '), {
                data: {
                    requester: message.author,
                    requestMessage: message
                },
                maxSongs: 15
            });
        } catch (e) {}

        if (!song) message.react('⛔');
    }
}