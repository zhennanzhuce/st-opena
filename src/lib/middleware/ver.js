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

    let v = query.v;

    if(v){
      if(!apis[query.method][1][v]){
        return res.send(200, { error: { code: 40004 } });
      }
    }

    next();
  };
};