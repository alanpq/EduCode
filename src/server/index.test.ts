import app from './index'
import * as supertest from 'supertest'

describe('app', () => {
  let request

  beforeEach(() => {
    request = supertest(app)
  })

  it('should return 200 for GET /', done => {
    request.get('/')
      .expect(200, done)
  })
})