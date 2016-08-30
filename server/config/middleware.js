var weather = require('./weather');
var soccer = require('./soccer');

module.exports = function(app, express) {

  app.use(express.static(__dirname + '/../../client'));

  app.get('/weather', weather.provideWeatherData);

  app.get('/soccer', soccer.provideSoccerData);

};
