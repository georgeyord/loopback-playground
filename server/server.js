'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const bunyan = require('bunyan');

module.exports = loopback();
const app = module.exports;

global.logger = bunyan.createLogger({ name: 'scrumpoker' });
global.Promise = require('bluebird');

app.start = async () => {
  app.server = app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    logger.info('Scrumpoker API server listening at: %s%s', baseUrl, app.settings.restApiRoot);

    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      logger.info(`Browse your REST API at: ${baseUrl}${explorerPath}`);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
