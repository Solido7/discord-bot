module.exports = class ReadyManualEvent {
    constructor (client) {
        this.client = client;
    }

    async run () {
        // Ready message
        console.log(`${this.client.user.tag} is online.`);

        // Sets the bots presence
        this.client.user.setPresence({ activity: { name: "something cool", type: "STREAMING", url: "https://www.twitch.tv/caps"}, status: "dnd" })
        .catch(console.error);
    }
}