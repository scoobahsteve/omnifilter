var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var mongoose = require('mongoose');
var expect = chai.expect;

process.env.MONGO_URI = 'mongodb://localhost/omnifilter_app_dev';

const server = require(__dirname + '/../server.js');
const User = require(__dirname + '/../models/user.js');
var baseUri = 'localhost:3000';
var userId;
var userToken;

describe('the authorization route', () => {
  after((done) => {
    User.remove({}, function(err) {
      done();
    });
  });
  it('should create a new user with a POST request', (done) => {
    chai.request(baseUri)
      .post('/signup')
      .send({"email":"omnifilter@codefellows.com", "password":"password"})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
  });
  describe('rest requests that require an existing user in the DB', () => {
    beforeEach((done) => {
      var newUser = new User();
      newUser.authentication.email = 'gene@gmail.com';
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
          expect(res.body).to.have.property('user');
          done();
        });
    });

  });
});
