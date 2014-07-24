/**
 * ChartController
 *
 * @description :: Server-side logic for managing charts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var https = require('https'),
    d3 = require('d3'),
    jsdom = require('jsdom'),
    // html file skull with a container div for the d3 dataviz
    htmlStub = '<html><head><link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min.css"></head><body><div id="dataviz-container"></div><script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script><script src="//cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min.js"></script></body></html>';

var githubEndpoint = function(user, repo) {
  var options = {
    hostname: 'api.github.com',
    path: '/repos/'+user+'/'+repo+'/languages?client_id='+sails.config.github.CLIENT_ID+'&client_secret='+sails.config.github.CLIENT_SECRET,
    headers: { 'User-Agent': 'Hopping Rabbit' }
  };
  return options;
};

module.exports = {

  bar: function(req, res) {

    // pass the html stub to jsDom
    jsdom.env({ features: { QuerySelector: true }, html: htmlStub,
      done: function(errors, window) {
        // process the html document, like if we were at client side
        // code to generate the dataviz and process the resulting html file to be added here
        var el = window.document.querySelector('#dataviz-container'),
            body = window.document.querySelector('body');

        https.get(githubEndpoint(req.param('user'), req.param('repo')), function(json) {
          json.setEncoding('utf8');
          json.on('data', function (languageJSON) {
            languageJSON = JSON.parse(languageJSON);
            var dataKeyVal = [];
            for (var lang in languageJSON) {
              dataKeyVal.push({'label': lang, 'value': languageJSON[lang]});
            }
            sails.log.info(dataKeyVal);
            // append the svg to the selector
            d3.select(el)
              .append('svg:svg')
              .attr('width', 600).attr('height', 300);

            // write the client-side script manipulating the circle
            var clientScript = "var chart = nv.models.discreteBarChart().x(function(d) { return d.label }).y(function(d) { return d.value }).staggerLabels(true).tooltips(false).showValues(true).transitionDuration(350);";
            var stringDatas = [];
            for(var key in dataKeyVal) {
              stringDatas.push(JSON.stringify(dataKeyVal[key]));
            }
            clientScript += "var datas = [{ key: 'Bar Chart test', values: ["+stringDatas+"] }]; d3.select('#dataviz-container svg').datum(datas).call(chart);";

            // append the script to page's body
            d3.select(body)
              .append('script')
              .html(clientScript);

            res.ok(window.document.innerHTML);
          });
        });
      }
    });

  }

};

