const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');


jest.mock('../models/Data', () => {

    const userData = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobileNumber: '1234567890' };

    return {

        find: jest.fn(),

        findByIdAndUpdate: jest.fn(),

        findByIdAndDelete: jest.fn(),

        save: jest.fn().mockResolvedValue(userData)

    };

});

const DataModel = require('../models/Data');
beforeAll(async () => {
    jest.spyOn(mongoose, 'connect').mockImplementation(() => Promise.resolve());
});
afterAll(async () => {
    await mongoose.disconnect();
});
describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        DataModel.find.mockResolvedValueOnce([]);
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});
describe('Test POST /register', () => {
    test('It should respond with 200 for valid data', async () => {
        const userData = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobileNumber: '1234567890' };
        Data.save.mockResolvedValue(userData);
 
        const response = await request(app)
            .post('/register')
            .send(userData);
 
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User Created');
    });
 
    test('It should respond with 500 for invalid data', async () => {
        const errorMessage = 'Mock Error';
        Data.save.mockRejectedValue(new Error(errorMessage));
 
        const response = await request(app)
            .post('/register')
            .send({});
 
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe(errorMessage);
    });
});
describe('Test PUT /register/:id', () => {
    test('It should response with 200 for valid id', async () => {
        const userData = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobileNumber: '1234567890' };
        DataModel.findByIdAndUpdate.mockResolvedValueOnce(userData);
        const response = await request(app).put('/register/123').send(userData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(userData);
    });
    test('It should response with 404 for invalid id', async () => {
        DataModel.findByIdAndUpdate.mockResolvedValueOnce(null);
        const response = await request(app).put('/register/123').send({});
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('cannot find any user with ID 123');
    });
});
describe('Test DELETE /register/:id', () => {
    test('It should response with 200 for valid id', async () => {
        const userData = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobileNumber: '1234567890' };
        DataModel.findByIdAndDelete.mockResolvedValueOnce(userData);
        const response = await request(app).delete('/register/123');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(userData);
    });
    test('It should response with 404 for invalid id', async () => {
        DataModel.findByIdAndDelete.mockResolvedValueOnce(null);
        const response = await request(app).delete('/register/123');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('cannot find any user with ID 123');
    });
});
