'use strict';

const assert = require('assert');

module.exports = function (Model, options) {
  const { size } = options;
  assert(size, 'Invalid token size');
  let token;

  async function findUniqueToken() {
    const tokenPool = String(Math.floor(10000000 + Math.random() * 90000000));
    token = tokenPool.substring(0, size);

    if (await Model.count({ token }) > 0) {
      findUniqueToken(Model);
    }
  }

  findUniqueToken(Model, size);
  Model.defineProperty('token', { type: String, default: token });
};
