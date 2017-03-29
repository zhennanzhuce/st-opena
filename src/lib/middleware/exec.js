/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');

exports = module.exports = (apis, opts) => {
  return (req, res, next) => {
    let query = URL.parse(req.url, true).query;

    let api = apis[query.method];
    let v = query.v || api[0];

    let method = api[1][v];
    method.exec(req, res, next);
  };
};