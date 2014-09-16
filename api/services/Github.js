/**
 * Created by acidghost on 16/09/14.
 */

var https = require('https');

module.exports = {

  endpoint: function(user, repo) {
    return {
      hostname: 'api.github.com',
      path: '/repos/'+user+'/'+repo+'/languages?client_id='+sails.config.github.CLIENT_ID+'&client_secret='+sails.config.github.CLIENT_SECRET,
      headers: { 'User-Agent': 'Hopping Rabbit' }
    };
  },

  getDatas: function(user, repo, callback) {
    https.get(this.endpoint(user, repo), function(json) {
      json.setEncoding('utf8');
      json.on('data', function (languageJSON) {
        languageJSON = JSON.parse(languageJSON);
        var dataKeyVal = [];
        for (var lang in languageJSON) {
          dataKeyVal.push({'label': lang, 'value': languageJSON[lang]});
        }

        sails.log.info('Data:', JSON.stringify(dataKeyVal));

        callback(dataKeyVal);
      });
    });
  }

};
