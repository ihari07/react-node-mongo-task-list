const request = require('supertest');
const { app } = require('../server');
const bcrypt = require('bcrypt');
const List = require('../models/List');

describe('Authentication Routes', () => {
    afterEach(async () => {
        await List.deleteMany({});
    });
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'test@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User created');
    });

    it('should log in an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.statusCode).toBe(200);

    });

    it('should fail to log in with incorrect password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'test@example.com', password: 'wrongpassword' });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
});
