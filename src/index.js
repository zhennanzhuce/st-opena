/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

module.exports = process.env.OPENA_COV
  ? require('./lib-cov/opena')
  : require('./lib/opena');