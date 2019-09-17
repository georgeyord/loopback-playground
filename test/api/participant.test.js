'use strict';

/**
 * Tests for the Participant Model
 */
const testSetup = require('../testSetup.js');
// Load the test utils
// const { should } = testSetup;
const { apiRequest } = testSetup;
const { apiBaseUrl } = testSetup;

describe('Testing Participant Model API', () => {
  const endpoint = `${apiBaseUrl}/Participants`;
  describe('Create a participant', () => {
    describe('without name', () => {
      let response;
      before('make the request', (done) => {
        apiRequest
          .post(`${endpoint}`)
          .send({})
          .then((res) => {
            response = res;
            done();
          })
          .catch(done);
      });
      it('should have Content-Type json', () => {
        response.type.should.match(/json/);
      });
      it('should return status code 422', () => {
        response.status.should.equal(422);
      });
      it('should return ValidationError error code', () => {
        response.body.error.should.have.property('name', 'ValidationError');
      });
    });

    describe('without empty name', () => {
      let response;
      before('make the request', (done) => {
        apiRequest
          .post(`${endpoint}`)
          .send({ name: '' })
          .then((res) => {
            response = res;
            done();
          })
          .catch(done);
      });
      it('should return status code 422', () => {
        response.status.should.equal(422);
      });
      it('should return ValidationError error code', () => {
        response.body.error.should.have.property('name', 'ValidationError');
      });
    });
  });

  describe('without name', () => {
    const participantName = 'foo';
    let response;
    before('make the request', (done) => {
      apiRequest
        .post(`${endpoint}`)
        .send({ name: participantName })
        .then((res) => {
          response = res;
          done();
        })
        .catch(done);
    });
    it('should have Content-Type json', () => {
      response.type.should.match(/json/);
    });
    it('should return status code 200', () => {
      response.status.should.equal(200);
    });
    it('should return a valid id', () => {
      response.body.should.have.property('id');
    });
    it('should return thw same name', () => {
      response.body.should.have.property('name', participantName);
    });
  });
});
