'use strict';

var app = require('../..');
import request from 'supertest';

var newCortium;

describe('Cortium API:', function() {

  describe('GET /api/cortiums', function() {
    var cortiums;

    beforeEach(function(done) {
      request(app)
        .get('/api/cortiums')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cortiums = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cortiums).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/cortiums', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cortiums')
        .send({
          name: 'New Cortium',
          info: 'This is the brand new cortium!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCortium = res.body;
          done();
        });
    });

    it('should respond with the newly created cortium', function() {
      expect(newCortium.name).to.equal('New Cortium');
      expect(newCortium.info).to.equal('This is the brand new cortium!!!');
    });

  });

  describe('GET /api/cortiums/:id', function() {
    var cortium;

    beforeEach(function(done) {
      request(app)
        .get('/api/cortiums/' + newCortium._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cortium = res.body;
          done();
        });
    });

    afterEach(function() {
      cortium = {};
    });

    it('should respond with the requested cortium', function() {
      expect(cortium.name).to.equal('New Cortium');
      expect(cortium.info).to.equal('This is the brand new cortium!!!');
    });

  });

  describe('PUT /api/cortiums/:id', function() {
    var updatedCortium;

    beforeEach(function(done) {
      request(app)
        .put('/api/cortiums/' + newCortium._id)
        .send({
          name: 'Updated Cortium',
          info: 'This is the updated cortium!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCortium = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCortium = {};
    });

    it('should respond with the updated cortium', function() {
      expect(updatedCortium.name).to.equal('Updated Cortium');
      expect(updatedCortium.info).to.equal('This is the updated cortium!!!');
    });

  });

  describe('DELETE /api/cortiums/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cortiums/' + newCortium._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cortium does not exist', function(done) {
      request(app)
        .delete('/api/cortiums/' + newCortium._id)
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
