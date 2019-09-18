'use strict';

/**
 * This function will assign tracking properties to request in order to see time taken to serve
 * See: [Loopback Middleware](https://docs.strongloop.com/display/public/LB/Defining+middleware)
 */
module.exports = () => function requestLogger(req, res, next) {
  logger.debug({ type: 'REQUEST_RECEIVED', req }, 'Client HTTP Request Received');
  next();
};
