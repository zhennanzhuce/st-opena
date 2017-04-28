/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');
const rest = require('speedt-utils').rest;
const utils = require('speedt-utils').utils;

exports = module.exports = (apis, fn) => {
  return (req, res, next) => {
    let query = URL.parse(req.url, true).query;

    // client_id
    if(!utils.isEmpty(query.appkey)){
      return res.send(200, { error: { code: 40005 } });
    }

    if(!utils.isEmpty(query.signature)){
      return res.send(200, { error: { code: 40006 } });
    }

    fn(query.appkey, (err, seckey) => {
      if(err) return next(err);
      if(!seckey) return res.send(200, { error: { code: 40007 } });

      let result = rest.validate(query, seckey);
      if(!result) return res.send(200, { error: { code: 40008 } });

      next();
    });
  };
};