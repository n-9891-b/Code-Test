const fs = require('fs');
const helpers = require('./dataHelpers');

module.exports = soccer = {

  provideSoccerData: (req, res) => {
    fs.readFile(__dirname + '/data/soccer.txt', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {

        const SoccerDataArray = data.split('\n').map((el) => {
          return el.split('');
        }).map((el) => {
          return helpers.parseDataPointArray(el);
        });

        const goalDifference = () => {
          let goalDifferenceByTeam = {},
          lowest,
          lowestGoalDiffTeam,
          i,
          team;

          for (i = 4; i < SoccerDataArray.length-2; i++) {
            let teamEntry = SoccerDataArray[i];
            goalDifferenceByTeam[teamEntry[1]] = Math.abs(parseInt(teamEntry[6]) - parseInt(teamEntry[8]));
          }
          for (team in goalDifferenceByTeam) {
            if (goalDifferenceByTeam[team] === 0) return {team, goalDifference: goalDifferenceByTeam[team]};
            if (!lowest || goalDifferenceByTeam[team] < lowest) {
              lowest = goalDifferenceByTeam[team];
              lowestGoalDiffTeam = team;
            }
          }
          return {
            team: lowestGoalDiffTeam,
            goalDifference: lowest
          };
        };
        res.send(goalDifference());
      }
    });
  }

}
