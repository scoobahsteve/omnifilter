var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var mongoose = require('mongoose');
var expect = chai.expect;

process.env.MONGO_URI = 'mongodb://localhost/auth_route_test';

const server = require(__dirname + '/../server.js');
const User = require(__dirname + '/../models/user');
var baseUri = 'localhost:3000';
var userId;
var userToken;

describe('authorization route', () => {
  after((done) => {
    User.remove({}, function(err) {
      done();
    });
  });
  it('should create a new user with a POST request', (done) => {
    chai.request(baseUri)
      .post('/signup')
      .send({"email":"gene@gmail.com", "password":"password"})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('email');
        done();
      });
  });
  describe('rest requests that require an existing user in the DB', () => {
    beforeEach((done) => {
      var newUser = new User();
      newUser.email = 'gene@gmail.com';
      newUser.hashPassword('password');
      newUser.save((err, data) => {
        userToken = data.generateToken();
        userId = data._id;
        done();
      });
    });
    it('should check if the user has valid credentials', (done) => {
      chai.request(baseUri)
        .get('/signin')
        .auth("gene@gmail.com", "password")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('email');
          done();
        });
    });

  });
});
