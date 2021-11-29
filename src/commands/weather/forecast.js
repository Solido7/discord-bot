const BaseCommand = require("../../utils/structures/BaseCommand");
const BaseEmbed = require("../../utils/structures/BaseEmbed");
const weather = require('weather-js');

module.exports = class ForecastCommand extends BaseCommand {
    constructor () {
        super("forecast", "weather");
        this.description = "Shows the weather forecast for a location. Bergen by default.";
        this.usage = "`_PREFIX_forecast {location}`"
    }

    async run (client, message, args) {
        let location = "Bergen";
        if (args.length > 0) location = args[0];


        weather.find({search: location, degreeType: 'C'}, function(err, result) {
            if(err) message.channel.send(`Error fetching data for ${location}`);

            console.log(result[0].forecast);

            const embed = new BaseEmbed(client, message.guild.id)
                .setTitle(`Weather forecast for ${result[0].location.name}`);

            let fields = new Array();
            result[0].forecast.forEach( d => {
                const day = {
                    name: d.day,
                    value: `High/low: ${d.high}°C/${d.low}°C\nPrecipitation: ${(d.precip == "") ? "0" : d.precip}`,
                    inline: false
                };
                fields.push(day);
            });

            embed.addFields(fields);
            message.channel.send({ embeds: [embed] });
          });
    }
}