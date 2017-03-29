/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const merge = require('utils-merge');

exports.init = function(app){
  return function openAInit(req, res, next){
    res.setHeader('X-Powered-By', 'opena');
    merge(res, app.res);
    next();
  };
};