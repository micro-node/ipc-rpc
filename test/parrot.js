require('babel/register');

var ipc = require('../lib/ipc-rpc');

ipc.response(process)(function(req, cb){

  if(req === 'f**k') return cb('be nice please');

  cb(null, req);
})
