/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const merge = require('utils-merge'),
      connect = require('connect');

const proto = require('./application');

exports = module.exports = createApplication;

function createApplication(){
  var app = connect();
  merge(app, proto);
  app.init();
  return app;
}

exports.api = {};
merge(exports.api, proto.middleware);