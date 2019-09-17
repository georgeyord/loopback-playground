'use strict';
// Load Dependencies
const chai = require('chai');
const request = require('supertest');

// Load Chai Plugins
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

const should = chai.should();

// Check for environment variables and set them if not already set
const env = process.env;
env.MONGO_DATABASE = env.MONGO_DATABASE || 'scrumpoker-test';

// Load application server
const app = require('../server/server.js');

// Bind the request handler to our application server
const apiRequest = request(app);

// Create the Test User for the app
const testUser = {
  username: 'testAppUser',
  password: 'testUserPassword',
  email: 'test@test.com'
};

let testUserToken = null;

/**
 * This function will be used as a shortcut to check unauthenticated access to the API for different
 * endpoint URLs. First parameter will be the url and finally the method to use.
 * @method checkUnauthenticated
 * @param {String} url The url to test
 * @param {String} method The method used for HTTP Request ex. get, post, put, delete
 */
function checkUnauthenticated(url, method) {
  const allowedMethods = ['get', 'put', 'post', 'del'];
  should.exist(url);
  should.exist(method);

  const methodLower = method.toLowerCase();

  methodLower.should.be.oneOf(allowedMethods);

  function wrongToken() {
    describe('When wrong token is provided', function () {
      console.log('When wrong token is provided');
      let response;
      before('make request with wrong token', function (done) {
        console.log('make request with wrong token');
        apiRequest[methodLower](url)
          .set('Authorization', 'What a weird Token')
          .then(res => {
            response = res;
            done();
          })
          .catch(done);
      });

      it('should return status code 401', function () {
        console.log('should return status code 401');
        response.status.should.equal(401);
      });
      it('should have Content-Type json', function () {
        console.log('should have Content-Type json');
        response.type.should.match(/json/);
      });
      it('should return UnauthorizedError message', function () {
        console.log('should return UnauthorizedError message');
        response.body.name.should.equal('UnauthorizedError');
      });
    });
  }

  describe(`When ${method.toUpperCase()} on ${url} not authorized`, function testUnauth() {
    wrongToken();
  });
}

before('Initialize required users for testing', function initTestApp(done) {
  console.log('Initialize required users for testing');
  // First we need to create the user
  const User = app.models.User;
  User.create(testUser)
    // Now we have to login the user and retrieve a token
    .then(() => User.login({ username: testUser.username, password: testUser.password }))
    .then(token => {
      testUserToken = token.id;
      done();
    })
    .catch(done); // pass error to mocha
});

after('Clean up test resources', function cleanTest(done) {
  console.log('Clean up test resources');
  // get db reference
  const db = app.datasources.mongodb ? app.datasources.mongodb.connector.db : null;
  if (!db) { // if we got db object successfully
    db.dropDatabase(done);
  } else {
    done();
  }
});

module.exports = {
  apiRequest,
  apiBaseUrl: app.settings.restApiRoot,
  testUser,
  testUserToken,
  should,
  checkUnauthenticated
};
