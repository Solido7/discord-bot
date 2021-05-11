const BaseCommand = require("../../utils/structures/BaseCommand");
const BaseEmbed = require("../../utils/structures/BaseEmbed");
const weather = require('weather-js');

module.exports = class WeatherCommand extends BaseCommand {
    constructor () {
        super("weather", "weather");
        this.description = "Shows the current weather for a location. Bergen by default.";
        this.usage = "`_PREFIX_weather {location}`"
    }

    async run (client, message, args) {
        let location = "Bergen";
        if (args.length > 0) location = args[0];


        weather.find({search: location, degreeType: 'C'}, function(err, result) {
            if(err) message.channel.send(`Error fetching data for ${location}`);

            const embed = new BaseEmbed(client, message.guild.id)
                .setTitle(`Current weather for ${result[0].location.name}`)
                .addField("Temperature", `${result[0].current.temperature}°C`, false)
                .addField("Wind", result[0].current.winddisplay, false)
                .addField("Humidity", result[0].current.humidity, false)
                .setThumbnail(result[0].current.imageUrl)
                .setFooter(`Data from ${result[0].current.observationtime}`);

            message.channel.send(embed);
          });

    }
}

function getEmoji(weatherType) {
    let emoji;

    switch(weatherType) {
        case "Sunny":
            emoji = "☀️";
            break;
        case "Partly Sunny":
            emoji = "🌥️";
            break;
        case "Mostly Sunny":
            emoji = "🌤️";
            break;
        case "Cloudy":
            emoji = "☁️";
            break;
        case "Mostly Cloudy":
            emoji = "☁️";
            break;
        case "Clear":
            emoji = "🌍";
            break;
        case "Mostly Clear":
            emoji = "🌍";
            break;
        case "Rain":
            emoji = "🌧️";
            break;
        case "Light Rain":
            emoji = "☔";
            break;
        default:
            emoji = "❓";
      }

      return emoji;
}