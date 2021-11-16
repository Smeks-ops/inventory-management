/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index.js');

const should = chai.should();

chai.use(chaiHttp);

// Our parent block
describe('posts', () => {
  describe('/POST post', () => {
    it('it should return an error becasue a token has to be passed', (done) => {
      const post = {
        content: 'This is the first post',
      };
      chai.request(index)
        .post('/post')
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('No token provided.');
          done();
        });
    });
  });
});
