const weather = require('./weather');
const soccer = require('./soccer');

module.exports = (app, express) => {

  app.use(express.static(__dirname + '/../../client'));

  app.get('/weather', weather.provideWeatherData);

  app.get('/soccer', soccer.provideSoccerData);

};
