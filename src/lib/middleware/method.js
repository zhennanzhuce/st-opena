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

    if(!query.method){
      return res.send(200, { error: { code: 40002 } });
    }

    if(!apis[query.method]){
      return res.send(200, { error: { code: 40003 } });
    }

    next();
  };
};