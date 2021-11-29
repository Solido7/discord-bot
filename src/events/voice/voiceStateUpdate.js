const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class VoiceStateUpdateEvent extends BaseEvent {
    constructor () {
        super("voiceStateUpdate");
    }

    async run (client, oldState, newState) {
        if (oldState.member.user.bot || newState.member.user.bot) return;

        if (!(oldState.channel)) { // User joined channel
            let textChannel = client.textChannels.get(newState.channelId);

            if (textChannel) {
                let permissionOverwrites = textChannel.permissionOverwrites;
                permissionOverwrites.edit(newState.member.id, { 'VIEW_CHANNEL': true });

            } else {
                let parent = newState.channel.parent;
                let channel = await parent.createChannel(newState.channel.name, {
                    permissionOverwrites: [
                        {
                            id: newState.guild.roles.everyone.id,
                            deny: ['VIEW_CHANNEL', 'CREATE_INSTANT_INVITE']
                        },
                        {
                            id: newState.member.id,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                });

                client.textChannels.set(newState.channelId, channel);
            }
        } else if (!(newState.channel)) { // User left channel
            let textChannel = client.textChannels.get(oldState.channelId);

            if (textChannel) {
                let voiceChannel = oldState.channel;

                if (voiceChannel.members.size < 1) {
                    textChannel.delete();
                    client.textChannels.delete(oldState.channelId);
                }
            }
        } else { // User moved channel
            // Check old channel first
            let textChannel = client.textChannels.get(oldState.channelId);
            if (textChannel) {
                let voiceChannel = oldState.channel;

                if (voiceChannel.members.size < 1) {
                    textChannel.delete();
                    client.textChannels.delete(oldState.channelId);
                }
            }

            // Then check new channel
            textChannel = client.textChannels.get(newState.channelId);

            if (textChannel) {
                let permissionOverwrites = textChannel.permissionOverwrites;
                permissionOverwrites.edit(newState.member.id, { 'VIEW_CHANNEL': true });

            } else {
                let parent = newState.channel.parent;
                let channel = await parent.createChannel(newState.channel.name, {
                    permissionOverwrites: [
                        {
                            id: newState.guild.roles.everyone.id,
                            deny: ['VIEW_CHANNEL', 'CREATE_INSTANT_INVITE']
                        },
                        {
                            id: newState.member.id,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                });

                client.textChannels.set(newState.channelId, channel);
            }
        }
    }
}


