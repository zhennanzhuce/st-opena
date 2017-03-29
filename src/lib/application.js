/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const fs = require('fs'),
      path = require('path'),
      basename = path.basename;

const api = require('./api'),
      Constants = require('./util/constants'),
      res = require('./response'),
      req = require('./request'),
      middleware = require('./middleware');

var app = exports = module.exports = {};

app.init = function(){
  var self = this;
  self.res = res;
  self.req = req;
  defaultConfiguration.call(self);
};

function defaultConfiguration(){
  var self = this;
  api.init(self);
  self.use(middleware.init(self));
};

exports.middleware = {};

(() => {
  var load = name => require(path.join(__dirname, 'middleware', name));

  fs.readdirSync(path.join(__dirname, 'middleware')).forEach(filename => {
    if(!/\.js$/.test(filename)) return;
    var name = basename(filename, '.js');
    exports.middleware.__defineGetter__(name, load.bind(null, name));
  });
})();

app.configure = function(env, fn){
  return this;
};