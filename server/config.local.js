'use strict';

/* eslint prefer-template: 0 */

/**
 * Extra logic for configuration of server
 * @module server/config.local.js
 */

const p = require('../package.json');
const version = p.version.split('.').shift();
const name = p.name;

const env = process.env;
const isDocker = (process.env.IS_DOCKER == 1);

module.exports = {
  /**
   * The restApiRoot option that will be defined according to the version of the microservice
   */
  restApiRoot: `/api${version > 0 ? '/v' + version : ''}`
};
