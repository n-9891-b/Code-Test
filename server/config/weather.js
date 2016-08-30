const fs = require('fs');
const helpers = require('./dataHelpers');

module.exports = weather = {

  provideWeatherData: (req, res) => {

    fs.readFile(__dirname + '/data/w_data.txt', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {

        const weatherDataArray = data.split('\n').map((el) => {
          return el.split('');
        }).map((el) => {
          return helpers.parseDataPointArray(el);
        });

        const tempSpread = () => {
          let daysSpread = {},
          lowest,
          lowestDay,
          i,
          day;

          for (i = 6; i < weatherDataArray.length-2; i++) {
            let day = weatherDataArray[i];
            daysSpread[day[0]] = [(parseInt(day[1]) - parseInt(day[2])), day[1], day[2]];
          }
          for (day in daysSpread) {
            if (daysSpread[day][0] === 0) return [day, daysSpread[day][1], daysSpread[day][2]];
            if (!lowest || daysSpread[day][0] < lowest) {
              lowest = daysSpread[day][0];
              lowestDay = day;
            }
          }
          return {
            day: lowestDay,
            high: daysSpread[lowestDay][1],
            low: daysSpread[lowestDay][2]
          };
        };
        res.send(tempSpread());
      }
    });
  }

}

// helpers.readFileData('/w_data.txt');
