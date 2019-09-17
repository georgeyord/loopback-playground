"use strict";

let loopback = require("loopback");
let boot = require("loopback-boot");

let app = (module.exports = loopback());

// TODO: global.logger = require('./lib/common').logger({ name: 'analytics' });
// TODO: global.Promise = require('bluebird');

app.start = async () => {
  app.server = app.listen(() => {
    app.emit("started");
    var baseUrl = app.get("url").replace(/\/$/, "");
    console.log("Scrumpoker API server listening at: %s%s", baseUrl, app.settings.restApiRoot);

    if (app.get("loopback-component-explorer")) {
      var explorerPath = app.get("loopback-component-explorer").mountPath;
      console.log("Browse your REST API at %s%s", baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
