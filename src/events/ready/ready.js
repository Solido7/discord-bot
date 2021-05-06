const BaseEvent = require("../../utils/structures/BaseEvent");

class ReadyEvent extends BaseEvent {
    constructor () {
        super("ready");
    }

    async run (client) {
        console.log("Bot is actually online!");
        /*console.log(client.user.tag + " is online!");

        client.user.setPresence({ activity: { name: "something cool", type: "WATCHING", url: "https://www.twitch.tv/lec"}, status: "dnd" })
        .catch(console.error);

        client.guilds.cache.forEach(guild => {
            this.connection.query(
                `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
                console.log(guildCommandPrefixes);
            }).catch(err => console.log(err));
        }); */
    }
}


//module.exports = { ReadyEvent };