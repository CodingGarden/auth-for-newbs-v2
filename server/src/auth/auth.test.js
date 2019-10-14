const request = require('supertest');
const { expect } = require('chai');

const app = require('./../app');
const db = require('./../db/connection');

const users = db.get('users');

const newUser = {
  username: 'testuser',
  password: '1234567890',
};

describe('GET /auth', () => {
  it('should respond with a message', async () => {
    const response = await request(app)
      .get('/auth')
      .expect(200);
    expect(response.body.message).to.equal('Hello Auth! 🔐');
  });
});

describe('POST /auth/signup', () => {
  before(async () => {
    await users.remove({});
  });

  it('should require a username', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({})
      .expect(422);
    expect(response.body.message).to.equal('"username" is required');
  });
  it('should require a password', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ username: 'testuser' })
      .expect(422);
    expect(response.body.message).to.equal('"password" is required');
  });
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(200);
    expect(response.body).to.have.property('token');
  });
  it('should not allow a user with an existing username', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(409);
    expect(response.body.message).to.equal('That username is not unique. Please choose another one.');
  });
});

describe('POST /auth/login', () => {
  it('should require a username', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({})
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });
  it('should require a password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser' })
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });
  it('should only allow valid users to login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testtesttest' })
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });
  it('should only allow valid users to login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(newUser)
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});
