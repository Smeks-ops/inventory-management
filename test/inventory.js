/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index.js');

const should = chai.should();

chai.use(chaiHttp);

// Base url
describe('/GET ', () => {
  it('it should return a response when you call the base url', (done) => {
    chai.request(index)
      .get('/')
      .end((err, res) => {
        res.statusCode.should.eql(200);
        res.status.should.eql(200);
        done();
      });
  });
});

//Post inventories
describe('inventories', () => {
  describe('/inventory inventory', () => {
    it('it should return an error because a token has to be passed', (done) => {
      const inventory = {
        name: 'spoon',
      };
      chai.request(index)
        .post('/inventory')
        .send(inventory)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('No token provided.');
          done();
        });
    });
  });
});

//update route test
describe('inventories', () => {
  describe('/inventory inventory', () => {
    it('it should return an error because a token has to be passed', (done) => {
      const inventory = {
        name: 'spoon',
      };
      chai.request(index)
        .put('/inventory/:id')
        .send(inventory)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('No token provided.');
          done();
        });
    });
  });
});

