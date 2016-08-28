var fs = require('fs');
var HTMLParser = require('fast-html-parser');

module.exports = weather = {

  provideWeatherData: function(req, res) {
    fs.readFile(__dirname + '/w_data.txt', 'utf8', function(err, data){
      if (err) console.log(err);
      else {
        // console.log(data);
        var dataArr = data.split('\n');
        var temp = dataArr.map(function(el){
          // console.log('loggin split els', el);
          return el.split('');
        });
        // var parsed;
        // console.log('logging temp', temp);
        // var final = temp.map(function(el){
        //   el.filter(function(inner){
        //     // console.log('loging the inner el', inner);
        //     return inner !== '';
        //   });
        // });
        // console.log(dataArr);
        var final = temp.map(function(el) {
          // console.log('logging each el', el);
          return getDataPointArray(el);
        });

        var tableHeaders = final[4];

        // console.log(final);

        var tempSpread = function() {
          var daysSpread = {};
          var lowest;
          var lowestDay;
          for (var i = 6; i < final.length-2; i++) {
            // console.log('logging max', final[i][0], final[i][1]);
            daysSpread[final[i][0]] = [(parseInt(final[i][1]) - parseInt(final[i][2])), final[i][1], final[i][2]];
          }
          for (var key in daysSpread) {
            if (daysSpread[key][0] === 0) console.log(key, daysSpread[key][1], daysSpread[key][2]);
            if (!lowest || daysSpread[key][0] < lowest) {
              lowest = daysSpread[key][0];
              lowestDay = key;
            }
          }
          console.log(lowestDay, daysSpread[lowestDay][1], daysSpread[lowestDay][2])
        };

        tempSpread();

        function getDataPointArray(array) {
          var result = [];
          var tmp = '';
          for (var i = 0; i < array.length; i++) {
            // console.log('logging result', result);

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
        // console.log(data.split('\n'));
        // weather.parser(data, function(parsed) {
        //   // res.send(parsed);
        //   console.log(parsed);
        // });
      }
    });
  },

  // parser: function(data, cb) {
  //   var parsed = HTMLParser.parse(data);
  //   cb(parsed);
  // }

  parser: function(data, cd) {

  }

}
