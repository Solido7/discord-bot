/*const BaseEvent = require("../../utils/structures/BaseEvent");
const BaseEmbed = require("../../utils/structures/BaseEmbed");

module.exports = class SongFirstEvent extends BaseEvent {
    constructor () {
        super("songFirst");
    }

    async run (client, queue, song) {
        const message = song.data.requestMessage;

        const embed = new BaseEmbed(client, message.guild.id)
            .setAuthor(song.data.requester.username, song.data.requester.displayAvatarURL())
            .setTitle(song.name)
            .setImage(song.thumbnail)

        const messageEmbed = await message.channel.send({ embeds: [embed] });
        queue.messageEmbed = messageEmbed;

        let duration = song.milliseconds;
        let iterations = 25;
        let sleepTime = duration/iterations;

        for (let i = 0; i < iterations; i++) {
            if (queue.nowPlaying != song) break;

            let string = "";
            string += `${queue.createProgressBar().times.split('/')[0]} `;
            string += '▬'.repeat(i);
            string += '🔘';
            string += '▬'.repeat(iterations-i-1);
            string += ` ${song.duration}`;

            embed.setFooter(string, song.thumbnail);
            embed.setThumbnail(queue.songs.length > 1 ? queue.songs[1].thumbnail : null);
            queue.messageEmbed.edit({ embeds: [embed] });
            
            await new Promise(r => setTimeout(r, sleepTime));
        }

    }
}
*/

const BaseEvent = require("../../utils/structures/BaseEvent");
const BaseEmbed = require("../../utils/structures/BaseEmbed");
const SongChangedEvent = require("./songChanged");

module.exports = class SongFirstEvent extends BaseEvent {
    constructor () {
        super("songFirst");
    }

    async run (client, queue, song) {
        return new SongChangedEvent().run(client, queue, song, null);
        //return client.commands.get("songChanged").run(client, queue, song, null);
    }
}
