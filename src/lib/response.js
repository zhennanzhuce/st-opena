/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const http = require('http');

var res = module.exports = {};

/**
 * Send a response
 *
 * Examples:
 *   res.send(404)
 *   res.send('foo')
 *   res.send(404, 'foo')
 *   res.send({ foo: 'bar' })
 *   res.send(new Buffer('foo'))
 *
 * @api public
 */
res.send = function send(body){
  let len, statusCode;
  let self = this;

  // 判断第2个参数是否存在
  if(arguments[1]){
    statusCode = body;
    body = arguments[1];
  }

  switch(typeof body){
    case 'object':
      self.set('Content-Type', 'application/json;charset=utf-8');
      body = JSON.stringify(body || {});
      break;
    case 'number':
      statusCode = body;
      body = http.STATUS_CODES[statusCode];
    case 'string':
      self.set('Content-Type', 'text/plain;charset=utf-8');
      break;
  }

  if(!!body && !self.get('Content-Length')){
    self.set('Content-Length', len = Buffer.isBuffer(body)
              ? body.length
              : Buffer.byteLength(body));
  }

  if(statusCode) self.statusCode = statusCode;
  self.end(body);
};

res.get = function(field){
  return this.getHeader(field);
};

res.set =
res.header = function(field, val){
  if(2 === arguments.length){
    if(Array.isArray(val)){
      val = val.map(String);
    }else{
      val = String(val);
    }
    this.setHeader(field, val);
  }else{
    for(let key in field){
      this.set(key, field[key]);
    }
  }
  return this;
};