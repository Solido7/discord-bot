module.exports = class AwaitReactions {
    constructor(client, message, n, reaction) {
        this.client = client;
        this.message = message;
        this.n = n;
        this.reaction = reaction;
    }

    run (time) {
        this.message.react(this.reaction);
    
        const filter = (reaction, user) => {
            let queueChannel = this.client.player.getQueue(this.message.guild.id).connection.channel;
            let userChannel = this.message.guild.members.cache.get(user.id).voice.channel;
            return !user.bot && reaction.emoji.name === this.reaction && queueChannel === userChannel;
        }

        const collector = this.message.createReactionCollector({ filter, maxUsers: this.n, time: time});
        collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
        return collector;
    }
}