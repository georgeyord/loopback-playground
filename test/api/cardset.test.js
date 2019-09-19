'use strict';

/**
 * Tests for the Participant Model
 */
const testSetup = require('../testSetup.js');
// Load the test utils
// const { should } = testSetup;
const { appModels, apiRequest, apiBaseUrl } = testSetup;

// let sampleCardSet = {};
// before('Initialize required models for testing', () => {
//   appModels.CardSet.findOne({ where: { name: 'Fibonacci' } })
//     .then((...args) => {
//       console.log(args);
//       sampleCardSet = args.cardSet;
//     });
// });

describe('Testing CardSet Model API', () => {
  const endpoint = `${apiBaseUrl}/CardSets`;
  describe('Create a cardset', () => {
    describe('without a name', () => {
      let response;
      before('make the request', async () => apiRequest
        .post(`${endpoint}`)
        .send({})
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
        .send({ name: 'Foo' })
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
      it('should return the same name', () => {
        response.body.should.have.property('name', 'Foo');
      });
    });
  });

  describe('Find a cardset', () => {
    describe('with properDara', () => {
      let response;
      before('make the request', async () => apiRequest
        .get(`${endpoint}/findOne`)
        .query({ filter: { where: { name: 'Fibonacci' } } })
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
      it('should return the same name', () => {
        response.body.should.have.property('name', 'Fibonacci');
      });
    });
  });
});
