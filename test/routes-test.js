'use strict';

const request = require('supertest');
const expect = require('chai').expect;

const app = require('../src/routes');

describe('Express Routes', () => {
  describe('To root path', () => {
    it('Returns 200 status', (done) => {
      request(app)
        .get('/')
        .expect(200, done)
    });
    it('Returns a Content-Type of HTML', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/, done);
    });
  });

  describe('To URL shorterner API', () => {
    it('Retruns 200 status', (done) => {
      request(app)
        .get('/new/http://www.example.com')
        .expect(200, done)
    });
    it('Returns JSON format', (done) => {
      request(app)
        .get('/new/http://www.example.com')
        .expect('Content-Type', /json/, done);
    });
    it('Returns a URL not found error if no params are provided', (done) => {
      const expectedResponse = {
        error: 'No URL found'
      };
      request(app)
        .get('/new/')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done);
    })
    it('Returns an invalid URL error if url is not valid format', (done) => {
      const expectedResponse = {
        error: 'URL invalid'
      };
      request(app)
        .get('/new/blibidyboop')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done);
    });
    it(`Returns an object with the original url and
        the short url if the URL provided is valid`, (done) => {
      const expectedResponse = {
        original_url: 'htttp://www.example.com',
        short_url: 'http:/localhost:3000/2'
      };
      request(app)
        .get('/new/htttp://www.example.com')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done);
    });
  });
});
