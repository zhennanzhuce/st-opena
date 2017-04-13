/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');
const utils = require('speedt-utils').utils;

exports = module.exports = (apis, opts) => {
  return (req, res, next) => {
    let query = URL.parse(req.url, true).query;

    // client_id
    if(!utils.isEmpty(query.appkey)){
      return res.send(403, { error: { code: 40005 } });
    }

    if(!utils.isEmpty(query.signature)){
      return res.send(403, { error: { code: 40006 } });
    }

    next();
  };
};