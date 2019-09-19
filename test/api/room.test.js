'use strict';

/**
 * Tests for the Participant Model
 */
const testSetup = require('../testSetup.js');
// Load the test utils
// const { should } = testSetup;
const { appModels, apiRequest, apiBaseUrl } = testSetup;

describe('Testing Room Model API', () => {
  const endpoint = `${apiBaseUrl}/Rooms`;

  let sampleCardSet = {};
  before('Initialize required models for testing', () => {
    appModels.CardSet.findOne({ where: { name: 'Fibonacci' } })
      .then((cardSet) => {
        sampleCardSet = cardSet;
      });
  });

  describe('Create a room', () => {
    describe('without a name', () => {
      let response;
      before('make the request', async () => apiRequest
        .post(`${endpoint}`)
        .send({
          cardSetID: sampleCardSet.id
        })
        .then((res) => {
          response = res;
        }));

      it('should return ValidationError error code', () => {
        response.body.error.should.have.property('name', 'ValidationError');
      });
    });

    describe('without a cardSetID', () => {
      let response;
      before('make the request', async () => apiRequest
        .post(`${endpoint}`)
        .send({
          name: 'A Team',
          isPrivate: true
        })
        .then((res) => {
          response = res;
        }));

      it('should return ValidationError error code', () => {
        response.body.error.should.have.property('name', 'ValidationError');
      });
    });

    describe('with properDara', () => {
      let response;

      before('make the request', async () => apiRequest
        .post(`${endpoint}`)
        .send({
          name: 'A Team',
          cardSetID: sampleCardSet.id
        })
        .then((res) => {
          response = res;
        }));

      it('should have Content-Type json', () => {
        response.type.should.match(/json/);
      });
      it('should return status code 200', () => {
        response.status.should.equal(200);
      });
      it('should return a valid id', () => {
        response.body.should.have.property('id');
      });
      it('should return a valid cardSetID', () => {
        response.body.should.have.property('cardSetID');
      });
      it('should return a valid token', () => {
        response.body.should.have.property('token');
      });
      it('should return a valid isPrivate', () => {
        response.body.should.have.property('isPrivate', false);
      });
      it('should return a valid created date field', () => {
        response.body.should.have.property('created');
      });
      it('should return a valid updatedAt date field', () => {
        response.body.should.have.property('updatedAt');
      });
      it('should return the same name', () => {
        response.body.should.have.property('name', 'A Team');
      });
    });
  });


  describe('Find a room', () => {
    describe('with properDara', () => {
      let response;
      before('make the request', async () => apiRequest
        .get(`${endpoint}/findOne`)
        .query({ filter: { where: { name: 'Room1' } } })
        .then((res) => {
          response = res;
        }));

      it('should have Content-Type json', () => {
        response.type.should.match(/json/);
      });
      it('should return status code 200', () => {
        response.status.should.equal(200);
      });
      it('should return a valid id', () => {
        response.body.should.have.property('id');
      });
      it('should return a valid isPrivate', () => {
        response.body.should.have.property('isPrivate', false);
      });
      it('should return the same name', () => {
        response.body.should.have.property('name', 'Room1');
      });
    });
  });
});
