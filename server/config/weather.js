var fs = require('fs');
var helpers = require('./dataHelpers');
// var Promise = require('bluebird');

module.exports = weather = {

  provideWeatherData: function(req, res) {
        // var final = new Promise(function(resolve, reject) {
        //   resolve(helpers.readFileData('/w_data.txt'));
        // });
        // var d;
        // var final = Promise.promisify(helpers.readFileData);

        // final('/w_data.txt').then(function(data){
        //   console.log(data);
        // });
    fs.readFile(__dirname + '/w_data.txt', 'utf8', function(err, data){
      if (err) {
        console.log(err);
      } else {
        var dataArr = data.split('\n');
        var temp = dataArr.map(function(el){
          return el.split('');
        });

        var final = temp.map(function(el) {
          return weather.getDataPointArray(el);
        });

        var tempSpread = function() {
          var daysSpread = {};
          var lowest;
          var lowestDay;
          for (var i = 6; i < final.length-2; i++) {
            daysSpread[final[i][0]] = [(parseInt(final[i][1]) - parseInt(final[i][2])), final[i][1], final[i][2]];
          }
          for (var key in daysSpread) {
            if (daysSpread[key][0] === 0) return [key, daysSpread[key][1], daysSpread[key][2]];
            if (!lowest || daysSpread[key][0] < lowest) {
              lowest = daysSpread[key][0];
              lowestDay = key;
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
  },

  getDataPointArray: function(array) {
    var result = [];
    var tmp = '';
    for (var i = 0; i < array.length; i++) {

      if (array[i] !== ' ' && array[i] !== '') {
        tmp += array[i];
      } else if (!!tmp) {
        result.push(tmp);
        tmp = '';
      } else {
        tmp = '';
      }
    }
    return result;
  }

}

// helpers.readFileData('/w_data.txt');
