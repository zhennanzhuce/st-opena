/*!
 * opena
 * Copyright(c) 2017 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

const path = require('path'),
      fs = require('fs');

(() => {
  var load = (newPath, name) => require(path.join(newPath, name));

  /**
   * @api init
   */
  exports.init = function(app){
    let folder = 'api';
    let apis = app.apis = {};

    let run = (folder, newPath) => {
      fs.readdirSync(newPath).forEach(filename => {

        if(-1 === filename.indexOf('.')){
          if('_' !== filename){
            return run(folder +'.'+ filename, path.join(newPath, filename));
          }
        }

        let api_name = folder.substring(4);

        let api = apis[api_name];

        if(!api) api = apis[api_name] = [null, {}];

        if('_' === filename){
          let v = fs.readFileSync(path.join(newPath, filename), 'utf-8');
          return api[0] = v;
        }

        let _load = load.bind(null, newPath, filename)();
        api[1][filename.substring(0, filename.length - 3)] = _load(app);
      });
    };

    run(folder, path.join(process.cwd(), folder));
  };
})();