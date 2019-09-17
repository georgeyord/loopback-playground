'use strict';

module.exports = function (app) {
  app.get('/status', app.loopback.status());
};
