/**
 * ChartController
 *
 * @description :: Server-side logic for managing charts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  _config: {
    rest: false,
    shortcuts: false,
    actions: false
  },

  bar: function(req, res) {

    Github.getDatas(req.param('user'), req.param('repo'), function(datas) {
      res.view('charts/bar', { layout: 'charts/container', locals: { data: datas } });
    });

  },

  pie: function(req, res) {

    Github.getDatas(req.param('user'), req.param('repo'), function(datas) {
      res.view('charts/pie', { layout: 'charts/container', locals: { data: datas } });
    });

  }

};

