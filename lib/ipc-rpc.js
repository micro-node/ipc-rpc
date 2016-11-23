import uuid from 'uuid';

const REQUESTTYPE = 'request';
const RESPONSETYPE = 'response';
const EVENT = 'message';

let callbacks = {};

export function request(inputChannel, outputChannel = inputChannel, event = EVENT){

  inputChannel.on(event, function({id, err, data}){

    let callback = callbacks[id];

    if(callback){

      callback(err, data);

      delete callbacks[id];
    }
  });

  return function(data, callback){

    let id = uuid.v4();

    callbacks[id] = callback;

    outputChannel.send({type: REQUESTTYPE, id, data});
  };
}

export function response(inputChannel, outputChannel = inputChannel, event = EVENT){

  return function(handler){

    inputChannel.on(event, function({type, id, data}){

      if(type !== REQUESTTYPE) return;

      handler(data, function(err, data){

        outputChannel.send({type: RESPONSETYPE, id, err, data});
      });
    });
  };
}
