const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class ReadyEvent extends BaseEvent {
    constructor () {
        super("ready");
    }

    async run (client) {
        // Ready message
        console.log(`${client.user.tag} is online.`);

        // Sets the bot's presence
        client.user.setPresence({ activities: [{ name: "SOMETHING ILLEGAL", type: "STREAMING", url: "https://www.twitch.tv/caps"}], status: "dnd" });


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