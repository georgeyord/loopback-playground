'use strict';

module.exports = function (Message) {
  Message.greet = function (msg, cb) {
    process.nextTick(() => {
      cb(null, `Sender says ${msg || 'hello'} to receiver`);
    });
  };
};
