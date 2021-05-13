const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class SongFirstEvent extends BaseEvent {
    constructor () {
        super("songFirst");
    }

    async run (client, message, song) {
        message.channel.send(`**${song.name}** is now playing!`);
    }
}
        
        
        