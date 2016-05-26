'use strict';

var app = require('../..');
import request from 'supertest';

var newSunderer;

describe('Sunderer API:', function() {

  describe('GET /api/sunderers', function() {
    var sunderers;

    beforeEach(function(done) {
      request(app)
        .get('/api/sunderers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sunderers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sunderers).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/sunderers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sunderers')
        .send({
          name: 'New Sunderer',
          info: 'This is the brand new sunderer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSunderer = res.body;
          done();
        });
    });

    it('should respond with the newly created sunderer', function() {
      expect(newSunderer.name).to.equal('New Sunderer');
      expect(newSunderer.info).to.equal('This is the brand new sunderer!!!');
    });

  });

  describe('GET /api/sunderers/:id', function() {
    var sunderer;

    beforeEach(function(done) {
      request(app)
        .get('/api/sunderers/' + newSunderer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sunderer = res.body;
          done();
        });
    });

    afterEach(function() {
      sunderer = {};
    });

    it('should respond with the requested sunderer', function() {
      expect(sunderer.name).to.equal('New Sunderer');
      expect(sunderer.info).to.equal('This is the brand new sunderer!!!');
    });

  });

  describe('PUT /api/sunderers/:id', function() {
    var updatedSunderer;

    beforeEach(function(done) {
      request(app)
        .put('/api/sunderers/' + newSunderer._id)
        .send({
          name: 'Updated Sunderer',
          info: 'This is the updated sunderer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSunderer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSunderer = {};
    });

    it('should respond with the updated sunderer', function() {
      expect(updatedSunderer.name).to.equal('Updated Sunderer');
      expect(updatedSunderer.info).to.equal('This is the updated sunderer!!!');
    });

  });

  describe('DELETE /api/sunderers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sunderers/' + newSunderer._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sunderer does not exist', function(done) {
      request(app)
        .delete('/api/sunderers/' + newSunderer._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
