var weather = require('./weather');

module.exports = function(app, express) {

  app.use(express.static(__dirname + '/../../client'));

  app.get('/weather', weather.provideWeatherData);
};
