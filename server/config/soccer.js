var fs = require('fs');
var helpers = require('./dataHelpers');

module.exports = soccer = {

  provideSoccerData: function(req, res) {
    fs.readFile(__dirname + '/soccer.txt', 'utf8', function(err, data){
      if (err) {
        console.log(err);
      } else {
        var dataArr = data.split('\n');
        var temp = dataArr.map(function(el){
          return el.split('');
        });

        var final = temp.map(function(el) {
          return soccer.getDataPointArray(el);
        });

        console.log(final);
        var goalDifference = function() {
          var goalDifference = {};
          var lowest;
          var team;
          for (var i = 4; i < final.length-2; i++) {
            goalDifference[final[i][1]] = Math.abs(parseInt(final[i][6]) - parseInt(final[i][8]));
          }
          for (var key in goalDifference) {
            if (goalDifference[key] === 0) return [key, goalDifference[key]];
            if (!lowest || goalDifference[key] < lowest) {
              lowest = goalDifference[key];
              team = key;
            }
          }
          return {
            team: team,
            goalDifference: lowest
          };
        };
        res.send(goalDifference());
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
