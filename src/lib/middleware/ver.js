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

    if(query.v){
      if(!apis[query.method][1][query.v]){
        return res.send(403, { error: { code: 40004 } });
      }
    }

    next();
  };
};