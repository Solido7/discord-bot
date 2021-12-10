const BaseEvent = require("../../utils/structures/BaseEvent");
const BaseEmbed = require("../../utils/structures/BaseEmbed");
const { ContextMenuInteraction } = require("discord.js");
const AwaitReactions = require("../../utils/awaitReactions");
const { Utils } = require('discord-music-player');

module.exports = class SongChangedEvent extends BaseEvent {
    constructor () {
        super("songChanged");
    }

    async run (client, queue, newSong, oldSong) {
        const oldEmbed = queue.messageEmbed;
        if (oldEmbed) oldEmbed.delete();

        const message = newSong.data.requestMessage;

        const embed = new BaseEmbed(client, message.guild.id)
            .setAuthor(newSong.data.requester.username, newSong.data.requester.displayAvatarURL())
            .setTitle(newSong.name)
            .setImage(newSong.thumbnail)


        const messageEmbed = await message.channel.send({ embeds: [embed] })
        queue.messageEmbed = messageEmbed;

        // Reaction testing 🔄 
        let totalListeners = queue.connection.channel.members.size;
        let amountNeededForSkip = Math.max(1, Math.floor(totalListeners/2));
        let skipCollector = new AwaitReactions(client, messageEmbed, amountNeededForSkip, '⏭️').run(newSong.milliseconds);
        skipCollector.on('end', collection => { if(queue.nowPlaying == newSong) queue.skip() });

        let pauseCollector = new AwaitReactions(client, messageEmbed, 1, '⏸️').run(newSong.milliseconds);
        pauseCollector.on('end', collection => this.reverseReaction(client, messageEmbed, queue, newSong, collection.first()));
        //


        let duration = newSong.milliseconds;
        let iterations = 25;
        let sleepTime = duration/iterations;

        for (let i = 0; i < iterations; i++) {
            if (queue.nowPlaying != newSong) break;
            let string = "";
            if (i == 0) {
                string += "00:00";
            } else {
                string += `${queue.createProgressBar().times.split('/')[0]} `;
            }
            string += '▬'.repeat(i);
            string += '🔘';
            string += '▬'.repeat(iterations-i-1);
            string += ` ${newSong.duration}`;

            embed.setFooter(string);
            embed.setThumbnail(queue.songs.length > 1 ? queue.songs[1].thumbnail : null);
            queue.messageEmbed.edit({ embeds: [embed] });
            
            await new Promise(r => setTimeout(r, sleepTime));
        }
    }

    reverseReaction(client, messageEmbed, queue, newSong, reaction) {
        if(queue.nowPlaying == newSong) reaction.remove();

        let newReaction = reaction.emoji.name == '⏸️' ? '▶️' : '⏸️';
        let newPauseState = reaction.emoji.name == '⏸️' ? true : false;

        if(queue.nowPlaying == newSong) queue.setPaused(newPauseState);

        let currentTime = queue.createProgressBar().times.split('/')[0];
        let timeLeft = queue.nowPlaying.milliseconds - Utils.timeToMs(currentTime);

        let collector = new AwaitReactions(client, messageEmbed, 1, newReaction).run(timeLeft);
        collector.on('end', collection => this.reverseReaction(client, messageEmbed, queue, newSong, collection.first()));
    }
}
      