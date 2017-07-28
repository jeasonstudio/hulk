/* eslint-env node, mocha */
const app = require('../../app');
const http = require('http');
const expect = require('chai').expect;
const request = require('supertest');

describe('MiddleWare', () => {
  app.set('port', 3000);
  const server = http.createServer(app);
  before(() => {
    server.listen(3000);
  });
  after(() => {
    server.close();
  });

  it('Middle Ware test route', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Hello World!');
        done();
      });
  });

  it('Middle Ware test allMethod-get', (done) => {
    request(server)
      .get('/allMethod')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.deep.equal(JSON.stringify({ allMethod: 1 }));
        done();
      });
  });
  it('Middle Ware test allMethod-post', (done) => {
    request(server)
      .post('/allMethod')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.deep.equal(JSON.stringify({ allMethod: 1 }));
        done();
      });
  });

  it('Middle Ware test resCode-500', (done) => {
    request(server)
      .get('/resCode')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.deep.equal(JSON.stringify({ resCode: 500 }));
        done();
      });
  });

  it('Middle Ware test resHeaders', (done) => {
    request(server)
      .get('/resHeaders')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers['header-test']).to.deep.equal('Jeason');
        expect(res.header['header-test']).to.deep.equal('Jeason');
        done();
      });
  });

  it('Middle Ware test route reg', (done) => {
    request(server)
      .get('/Jeasons')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.deep.equal(JSON.stringify({ Jeason: 2 }));
        done();
      });
  });

  it('Middle Ware test invade', (done) => {
    request(server)
      .get('/invade')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers.jeason).to.deep.equal('21');
        expect(res.header.jeason).to.deep.equal('21');
        expect(res.text).to.deep.equal(JSON.stringify({ invade: 1 }));
        done();
      });
  });

  it('Middle Ware test 404 Not Found', (done) => {
    request(server)
      .get('/404')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('404 Not Found');
        done();
      });
  });

  it('Middle Ware test url string', (done) => {
    request(server)
      .get('/string')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal(JSON.stringify({ string: 1 }));
        done();
      });
  });

  it('Middle Ware test url Function string', (done) => {
    request(server)
      .get('/function')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal(JSON.stringify({ function: 1 }));
        done();
      });
  });
});
