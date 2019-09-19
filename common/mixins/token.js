'use strict';

const assert = require('assert');

module.exports = function (Model, options) {
  const { size } = options;
  assert(size, 'Invalid token size');

  async function generatorUniqueToken() {
    const tokenPool = String(Math.floor(10000000 + Math.random() * 90000000));
    const candindate = tokenPool.substring(0, size);

    if (await Model.count({ token: candindate }) > 0) {
      return generatorUniqueToken(Model);
    }
    return candindate;
  }

  Model.defineProperty('token',
    {
      type: String,
      required: true,
      index: {
        unique: true
      }
    });

  Model.observe('before save', async (ctx) => {
    if (ctx.isNewInstance) {
      ctx.instance.token = await generatorUniqueToken();
    }
  });

  // Model.helloWorld = function (msg, cb) {
  //   process.nextTick(() => {
  //     cb(null, `Hello ${msg || 'World'}!`);
  //   });
  // };

  // Model.remoteMethod(
  //   'token',
  //   {
  //     http: {
  //       path: '/token',
  //       verb: 'get'
  //     },
  //     accepts: [
  //       { arg: 'token', type: 'string', http: { source: 'path' } }
  //     ],
  //     returns: {
  //     }
  //   }
  // );
};
