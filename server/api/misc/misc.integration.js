'use strict';

var app = require('../..');
import request from 'supertest';

var newMisc;

describe('Misc API:', function() {
  describe('GET /api/miscs', function() {
    var miscs;

    beforeEach(function(done) {
      request(app)
        .get('/api/miscs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          miscs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(miscs).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/miscs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/miscs')
        .send({
          name: 'New Misc',
          info: 'This is the brand new misc!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMisc = res.body;
          done();
        });
    });

    it('should respond with the newly created misc', function() {
      expect(newMisc.name).to.equal('New Misc');
      expect(newMisc.info).to.equal('This is the brand new misc!!!');
    });
  });

  describe('GET /api/miscs/:id', function() {
    var misc;

    beforeEach(function(done) {
      request(app)
        .get(`/api/miscs/${newMisc._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          misc = res.body;
          done();
        });
    });

    afterEach(function() {
      misc = {};
    });

    it('should respond with the requested misc', function() {
      expect(misc.name).to.equal('New Misc');
      expect(misc.info).to.equal('This is the brand new misc!!!');
    });
  });

  describe('PUT /api/miscs/:id', function() {
    var updatedMisc;

    beforeEach(function(done) {
      request(app)
        .put(`/api/miscs/${newMisc._id}`)
        .send({
          name: 'Updated Misc',
          info: 'This is the updated misc!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMisc = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMisc = {};
    });

    it('should respond with the original misc', function() {
      expect(updatedMisc.name).to.equal('New Misc');
      expect(updatedMisc.info).to.equal('This is the brand new misc!!!');
    });

    it('should respond with the updated misc on a subsequent GET', function(done) {
      request(app)
        .get(`/api/miscs/${newMisc._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let misc = res.body;

          expect(misc.name).to.equal('Updated Misc');
          expect(misc.info).to.equal('This is the updated misc!!!');

          done();
        });
    });
  });

  describe('PATCH /api/miscs/:id', function() {
    var patchedMisc;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/miscs/${newMisc._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Misc' },
          { op: 'replace', path: '/info', value: 'This is the patched misc!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMisc = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMisc = {};
    });

    it('should respond with the patched misc', function() {
      expect(patchedMisc.name).to.equal('Patched Misc');
      expect(patchedMisc.info).to.equal('This is the patched misc!!!');
    });
  });

  describe('DELETE /api/miscs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/miscs/${newMisc._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when misc does not exist', function(done) {
      request(app)
        .delete(`/api/miscs/${newMisc._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
