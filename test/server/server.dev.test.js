const request = require('supertest')
const app = require('../../server/server.dev')

describe('test/server/server.dev.test.js', () => {
  it('should / status 301 redirect to /blog/list', done => {
    request(app)
      .get('/')
      .end((err, res) => {
        res.status.should.equal(301)
        res.text.should.containEql('/blog/list')
        done()
      })
  })
})
