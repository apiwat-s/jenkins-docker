const request = require('supertest')
const app = require('../app')

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
})

describe('Test the response', () => {
  test('It should response the hello jenkins', async () => {
    const response = await request(app).get('/')
    expect(response.text).toEqual('Hello Jenkins')
  })
})
