'use strict';

module.exports = function(req){
  return new Promise((resolve,reject) => {
    if(req.method == 'GET' || req.method == 'DELETE'){
      return resolve();
    }

    let text = '';
    req.on('data', (buffer) => {
      text += buffer.toString();
    });
    req.on('end', () => {
      try {
        let body = JSON.parse(text);
        req.body = body;
        resolve(body);
      } catch (err){
        err.status = 400;
        reject(err);
      }
    });
  });
};
