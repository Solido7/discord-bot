const BaseCommand = require("../../utils/structures/BaseCommand");
const weather = require('weather-js');
const { MessageEmbed } = require("discord.js");

module.exports = class WeatherCommand extends BaseCommand {
    constructor () {
        super("weather", "weather");
        this.description = "Shows the current weather for a location. Bergen by default.";
        this.usage = "`weather {location}`"
    }

    async run (client, message, args) {
        let location = "Bergen";
        if (args.length > 0) location = args[0];


        weather.find({search: location, degreeType: 'C'}, function(err, result) {
            if(err) message.channel.send(`Error fetching data for ${location}`);
           
            const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setColor(process.env.LIGHT_BLUE)
                .setTitle(`Current weather for ${result[0].location.name}`)
                .addField("Temperature", `${result[0].current.temperature}°C`, true)
                .addField("Sky Text", result[0].current.skytext, true)
                .addField("Humidity", result[0].current.humidity, true)
                .addField("Wind Speed", result[0].current.windspeed, true)
                .addField("Observation Time", result[0].current.observationtime, true)
                .addField("Wind Display", result[0].current.winddisplay, true)
                .setThumbnail(result[0].current.imageUrl);

            message.channel.send(embed);
          });

    }
}