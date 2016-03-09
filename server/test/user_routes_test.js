'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
process.env.MONGOLABL_URI = 'mongodb://localhost/user_app_test';

require(__dirname + '/../server');
const User = require(__dirname + '/../models/user');

describe('user API', () => {
  before((done) => {
    done();
});

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should create a user with a POST', (done) => {
      request('localhost:3000')
        .post('/newuser')
        .send({ name: 'test user' })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql('test user');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

  it('should be able to verify that a user exists', (done) => {
    request('localhost:3000')
      .get('/verify/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

    describe('tests that require a user in db', () => {
      beforeEach((done) => {
        User.create({ authentication: { email: 'gene@gmail.com', password: 'password' } }, (err, data) => {
          if (err) return console.log(err);
          this.testUser = data;
          done();
        });
      });

      it('should be able to UPDATE a user', (done) => {
        request('localhost:3000')
          .put('/usersettings/' + this.testUser._id)
          .send({ email: 'new email' })
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('Successfully updated user');
            expect(res).to.have.status(200);
            done();
          });
      });

      it('should be able to DELETE a user', (done) => {
        request('localhost:3000')
          .delete('/deleteuser/' + this.testUser._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('Successfully deleted user');
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
