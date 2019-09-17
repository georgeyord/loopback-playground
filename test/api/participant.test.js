'use strict';
/**
 * Tests for the Participant Model
 */
const testSetup = require('../testSetup.js'); // Load the test utils
const should = testSetup.should;
const apiRequest = testSetup.apiRequest;
const apiBaseUrl = testSetup.apiBaseUrl;

describe('Testing Participant Model API', function () {
  const endpoint = `${apiBaseUrl}/Participants`;
  describe('Create a participant', function () {
    describe('without name', function () {
      let response;
      before('make the request', function (done) {
        apiRequest
          .post(`${endpoint}`)
          .send({})
          .then(res => {
            response = res;
            done();
          })
          .catch(done);
      });
      it('should have Content-Type json', function () {
        response.type.should.match(/json/);
      });
      it('should return status code 422', function () {
        response.status.should.equal(422);
      });
      it('should return ValidationError error code', function () {
        response.body.error.should.have.property('name', 'ValidationError');
      });
    });

    describe('without empty name', function () {
      let response;
      before('make the request', function (done) {
        apiRequest
          .post(`${endpoint}`)
          .send({name:""})
          .then(res => {
            response = res;
            done();
          })
          .catch(done);
      });
      it('should return status code 422', function () {
        response.status.should.equal(422);
      });
      it('should return ValidationError error code', function () {
        response.body.error.should.have.property('name', 'ValidationError');
      });
    });
  });

  describe('without name', function () {
    const participantName = 'foo';
    let response;
    before('make the request', function (done) {
      apiRequest
        .post(`${endpoint}`)
        .send({name: participantName})
        .then(res => {
          response = res;
          done();
        })
        .catch(done);
    });
    it('should have Content-Type json', function () {
      response.type.should.match(/json/);
    });
    it('should return status code 200', function () {
      response.status.should.equal(200);
    });
    it('should return a valid id', function () {
      response.body.should.have.property('id');
    });
    it('should return thw same name', function () {
      response.body.should.have.property('name', participantName);
    });
  });
});
