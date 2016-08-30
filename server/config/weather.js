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
            let dayEntry = weatherDataArray[i];
            daysSpread[dayEntry[0]] = (parseInt(dayEntry[1]) - parseInt(dayEntry[2]));
          }
          for (day in daysSpread) {
            if (daysSpread[day] === 0) return {day, tempSpread: 0};
            if (!lowest || daysSpread[day] < lowest) {
              lowest = daysSpread[day];
              lowestDay = day;
            }
          }
          return {
            day: lowestDay,
            tempSpread: lowest,
          };
        };
        res.send(tempSpread());
      }
    });
  }

}

// helpers.readFileData('/w_data.txt');
