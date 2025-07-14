const request = require('supertest');
const mongoose = require('mongoose');
const createApp = require('../../app');

const User = require('../../src/models/usuario');

describe('Testes de Autenticação', () => {
    let app;

    beforeAll(async () => {
        // conecta ao banco e cria a app
        app = await createApp();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    test('Deve registrar um novo usuário', async () => {
        const response = await request(app)
            .post('/api/usuarios/cadastrar')
            .send({
                nome: 'Test User',
                email: 'test@example.com',
                password: '12345678'
            })
            .expect(201);

        expect(response.body).toHaveProperty('token');
        expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    test('Deve falhar ao registrar com email duplicado', async () => {
        await User.create({
            nome: 'Test User',
            email: 'test@example.com',
            password: '12345678'
        });

        const response = await request(app)
            .post('/api/usuarios/cadastrar')
            .send({
                nome: 'Outro User',
                email: 'test@example.com',
                password: 'outro1234'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toMatch(/Email já registrado/i);
    });
});
