var util = require('util');
var cp = require('child_process');
var async = require('async');
var expect = require('chai').expect;

var ipc = require('../index');

var server = ipc.request(cp.fork(__dirname + '/parrot.js'));

describe('IPC-RPC specs', function(){


  it('should respond with the same thing', function(done){

    server('1', function(err, resp){

      expect(resp).to.equal('1');
      done(err);
    })

  })

  it('should respond with an error', function(done){

    server('f**k', function(err){

      expect(err).to.equal('be nice please');
      done();
    })

  })

  it('should respond with the same thing over and over again', function(done){

    var thingsToSay = ['hello', 'parrot', 'nice', 'color', 'you', 'have']

    async.map(thingsToSay, server, function(err, results){

      expect(results).to.deep.equal(thingsToSay);
      done();
    })
  })

})
