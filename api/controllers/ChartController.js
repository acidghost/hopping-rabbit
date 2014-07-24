/**
 * ChartController
 *
 * @description :: Server-side logic for managing charts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var https = require('https');

var githubEndpoint = function(user, repo) {
  return {
    hostname: 'api.github.com',
    path: '/repos/'+user+'/'+repo+'/languages?client_id='+sails.config.github.CLIENT_ID+'&client_secret='+sails.config.github.CLIENT_SECRET,
    headers: { 'User-Agent': 'Hopping Rabbit' }
  };
};

module.exports = {

  _config: {
    rest: false,
    shortcuts: false,
    actions: false
  },

  bar: function(req, res) {

    https.get(githubEndpoint(req.param('user'), req.param('repo')), function(json) {
      json.setEncoding('utf8');
      json.on('data', function (languageJSON) {
        languageJSON = JSON.parse(languageJSON);
        var dataKeyVal = [];
        for (var lang in languageJSON) {
          dataKeyVal.push({'label': lang, 'value': languageJSON[lang]});
        }

        sails.log.info('Data:', JSON.stringify(dataKeyVal));
        res.view('charts/bar', { layout: 'charts/container', locals: { data: dataKeyVal } });
      });
    });

  }

};

