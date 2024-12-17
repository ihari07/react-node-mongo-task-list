const request = require('supertest');
const {app} = require('../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const List = require('../models/List');

// Test Suite for List Routes
describe('List API', () => {
    let listId;
    let itemId;

    // Test to create a new list
    it('should create a new list', async () => {
        const res = await request(app)
            .post('/api/lists')
            .send({ name: 'Test List' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Test List');
        listId = res.body._id;
    });

    // Test to get all lists
    it('should get all lists', async () => {
        const res = await request(app)
            .get('/api/lists');

        expect(res.statusCode).toBe(200);
        // console.log(res.body);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Test to add an item to a list
    it('should add an item to a list', async () => {
        const res = await request(app)
            .post(`/api/lists/${listId}/items`)
            .send({ title: 'Test Item', details: 'Item Details' });

        expect(res.statusCode).toBe(201);
        expect(res.body.items.length).toBeGreaterThan(0);
        expect(res.body.items[0].title).toBe('Test Item');
        itemId = res.body.items[0]._id;
    });

    // Test to edit a list
    it('should edit a list', async () => {
        const res = await request(app)
            .put(`/api/lists/${listId}`)
            .send({ name: 'Updated Test List' });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Updated Test List');
    });

    // Test to edit an item in a list
    it('should edit an item in a list', async () => {
        const res = await request(app)
            .put(`/api/lists/${listId}/items/${itemId}`)
            .send({ title: 'Updated Item Title', details: 'Updated Item Details' });

        expect(res.statusCode).toBe(200);
        expect(res.body.items[0].title).toBe('Updated Item Title');
        expect(res.body.items[0].details).toBe('Updated Item Details');
    });

    // Test to delete a list
    it('should delete a list', async () => {
        const res = await request(app)
            .delete(`/api/lists/${listId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('List deleted');
    });
});
