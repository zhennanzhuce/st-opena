/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');
const rest = require('speedt-utils').rest;

exports = module.exports = (apis, fn) => {
  return (req, res, next) => {
    let query = URL.parse(req.url, true).query;

    fn(query.appkey, (err, seckey) => {
      if(err) return next(err);
      if(!seckey) return res.send(403, { error: { code: 40007 } });

      let result = rest.validate(query, seckey);
      if(!result) return res.send(403, { error: { code: 40008 } });

      next();
    });
  };
};