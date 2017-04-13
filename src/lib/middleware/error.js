/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

exports = module.exports = (apis, opts) => {
  return (err, req, res, next) => {
    if(!err) return next();
    res.send({ error: { msg: err } });
  };
};