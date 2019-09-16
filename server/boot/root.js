'use strict';

module.exports = function(server) {
  // Install a route that returns server status
  var router = server.loopback.Router();

  let statusPage = '/status';
  router.get(statusPage, server.loopback.status());
  // console.log('Status page: %s', statusPage);

  server.use(router);
};
