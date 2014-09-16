/**
 * ChartController
 *
 * @description :: Server-side logic for managing charts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var renderCorrectView = function(type, req, res) {
  Github.getDatas(req.param('user'), req.param('repo'), function(datas) {
    res.view('charts/'+type, { layout: 'charts/container', locals: { data: datas } });
  });
};

module.exports = {

  _config: {
    rest: false,
    shortcuts: false,
    actions: false
  },

  bar: function(req, res) {
    renderCorrectView('bar', req, res);
  },

  pie: function(req, res) {
    renderCorrectView('pie', req, res);
  },

  donut: function(req, res) {
    renderCorrectView('donut', req, res);
  }

};

