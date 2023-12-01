const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs/promises');
let app;
let mongod;
beforeAll(async ()=>{
    mongod = await MongoMemoryServer.create({
        instance:{
            port:27017
        }
    });
    require('dotenv').config({path:'.env.test'});
    const bootstrap = require('../app.js'); // Import your Express app
    app = await bootstrap();
});

afterAll(async()=>{
    await mongod.stop();
})

describe('Blog API', () => {
    let postId;

    // Test for GET all posts
    it('GET /api/v1/posts - success', async () => {
        const response = await request(app).get('/api/v1/posts');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test for POST create a new post
    it('POST /api/v1/posts - success', async () => {
        const response = await request(app)
            .post('/api/v1/posts')
            .send({
                title: 'Test Post',
                content: 'This is a test post'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Test Post');
        postId = response.body._id; // Store the postId for later tests
    });

    // Test for GET a single post
    it('GET /api/v1/posts/:id - success', async () => {
        const response = await request(app).get(`/api/v1/posts/${postId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Test Post');
    });

    // Test for PUT update a post
    it('PUT /api/v1/posts/:id - success', async () => {
        const response = await request(app)
            .put(`/api/v1/posts/${postId}`)
            .send({
                title: 'Updated Test Post'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Updated Test Post');
    });

    // Test for DELETE a post
    it('DELETE /api/v1/posts/:id - success', async () => {
        const response = await request(app).delete(`/api/v1/posts/${postId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Post deleted successfully');
    });
});
