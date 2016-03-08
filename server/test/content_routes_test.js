const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/content_app_test';
const server = require(__dirname + '/../server');
const Content = require(__dirname + '/../models/content');

describe('content api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all content', (done) => {
    chai.request('localhost:3000')
      .get('/getall')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create content with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/newcontent')
      .send({name: 'test content'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test content');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require content already in db', () => {
    beforeEach((done) => {
      Content.create({name: 'test content'}, (err, data) => {
        this.testContent = data;
        done();
      });
    });

    it('should be able to update content', (done) => {
      chai.request('localhost:3000')
        .put('/preview/' + this.testContent._id)
        .send({name: 'new content name'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully updated content');
          done();
        });
    });

    it('should be able to delete content', (done) => {
      chai.request('localhost:3000')
        .delete('/delete/' + this.testContent._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully deleted content');
          done();
        });
    });
  });
});
