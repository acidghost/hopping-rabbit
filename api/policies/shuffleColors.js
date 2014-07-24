/**
 * Created by acidghost on 24/07/14.
 */

module.exports = function(req, res, next) {

  var colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
  Array.prototype.shuffle = function(){
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
  };

  colors.shuffle();

  req.options.locals = req.options.locals || {};
  req.options.locals.colors = colors;

  next();

};
