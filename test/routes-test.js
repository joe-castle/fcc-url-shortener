'use strict';

const request = require('supertest');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

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

  describe('To new URL shorterner API', () => {
    before(() => {
      fs.writeFileSync(
        path.join(__dirname, './short-urls-test.json'),
        JSON.stringify([]),
        'utf8'
      )
    });
    after(() => {
      fs.writeFileSync(
        path.join(__dirname, './short-urls-test.json'),
        JSON.stringify([]),
        'utf8'
      )
    });

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
        original_url: 'http://www.example.com',
        short_url: 'http:/localhost:3000/0'
      };
      request(app)
        .get('/new/http://www.example.com')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done);
    });
    it(`If the url is missing http:// but is valid,
        response will be prepended with http://`, (done) => {
      const expectedResponse = {
        original_url: 'http://www.google.com',
        short_url: 'http:/localhost:3000/1'
      };
      request(app)
        .get('/new/www.google.com')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done)
    })
    it(`If the url has already been shortened, it responds with that object
        rather than creating a new one`, (done) => {
      const expectedResponse = {
        original_url: 'http://www.example.com',
        short_url: 'http:/localhost:3000/0'
      };
      request(app)
        .get('/new/http://www.example.com')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done)
    });
    it(`If the URL is invalid, but the user has passed ?allow=true,
      the url object will be generated anyway`, (done) => {
      const expectedResponse = {
        original_url: 'fakeurl',
        short_url: 'http:/localhost:3000/2'
      };
      request(app)
        .get('/new/fakeurl?allow=true')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done)
    });
  });

  describe('To shortened URL', () => {
    it('Should respond with a 302 status code', (done) => {
      request(app)
        .get('/new/1')
        .expect(302, done)
    });
  });
});
