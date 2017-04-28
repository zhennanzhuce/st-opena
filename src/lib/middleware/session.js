/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const URL = require('url');
const utils = require('speedt-utils').utils;

exports = module.exports = (fn) => {
  return (req, res, next) => {
    let query = URL.parse(req.url, true).query;

    // access_token
    if(!utils.isEmpty(query.session)){
      return res.send(200, { error: { code: '40009' } });
    }

    fn(query.session, (err, doc) => {
      if(err) return next(err);

      if(!doc) return res.send(200, { error: { code: 'invalid_session' } });
      if(doc.client_id !== query.appkey){
        return res.send(200, { error: { code: '40010' } });
      }

      req._user_id = doc.user_id;
      next();
    });
  };
};