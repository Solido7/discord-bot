const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class ReadyEvent extends BaseEvent {
    constructor () {
        super("ready");
    }

    async run (client) {
        // Ready message
        console.log(`${client.user.tag} is online.`);

        // Sets the bot's presence
        client.user.setPresence({ activity: { name: "SOMETHING ILLEGAL", type: "STREAMING", url: "https://www.twitch.tv/caps"}, status: "dnd" })
            .catch(console.error);
    }
}
