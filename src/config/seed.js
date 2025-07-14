require('dotenv').config({ path: '../../.env' });
console.log('MONGO_URI:', process.env.MONGO_URI);
const mongoose = require('mongoose');

// Models
const User = require('../models/usuario');
const Empresa = require('../models/empresa');
const Produto = require('../models/produto');
const Cliente = require('../models/cliente');
const Pedido = require('../models/pedido');

async function seedAdmin() {
    try {
        await User.deleteMany();
        await Empresa.deleteMany();
        await Produto.deleteMany();
        await Cliente.deleteMany();
        await Pedido.deleteMany();

        const user = await User.create({
            nome: 'Douglas Souza',
            email: 'douglas@example.com',
            password: '123456',
            role: 'admin'
        });

        const empresa = await Empresa.create({
            nomeFantasia: 'DevTech Solutions',
            razaoSocial: 'DevTech Soluções em TI LTDA',
            cnpj: '12345678000199',
            usuario: user._id
        });

        const clientes = await Cliente.insertMany([
            { nome: 'Cliente A', email: 'clientea@empresa.com', telefone: '11999999999', empresa: empresa._id },
            { nome: 'Cliente B', email: 'clienteb@empresa.com', telefone: '11888888888', empresa: empresa._id }
        ]);

        const produtos = await Produto.insertMany([
            { nome: 'Chaveiro do Batman', valor: 10.0, empresa: empresa._id },
            { nome: 'Copo Geek', valor: 25.0, empresa: empresa._id }
        ]);

        await Pedido.create({
            numero:2,
            cliente: clientes[0]._id,
            empresa: empresa._id,
            produtos: [
                { produto: produtos[0]._id, quantidade: 2 },
                { produto: produtos[1]._id, quantidade: 1 }
            ],
            status: 'pendente'
        });

        console.log('✅ Seed admin finalizado com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao executar seedAdmin:', err.message);
    }
}

async function seedUser() {
    try {
        const user = await User.create({
            nome: 'Paulo Cesar',
            email: 'paulo@example.com',
            password: '123456',
            role: 'user'
        });

        const empresa = await Empresa.create({
            nomeFantasia: 'Car Solutions',
            razaoSocial: 'Carros Soluções LTDA',
            cnpj: '12345678000155',
            usuario: user._id
        });

        const clientes = await Cliente.insertMany([
            { nome: 'Cliente A', email: 'clientea@empresa.com', telefone: '11999999999', empresa: empresa._id },
            { nome: 'Cliente B', email: 'clienteb@empresa.com', telefone: '11888888888', empresa: empresa._id }
        ]);

        const produtos = await Produto.insertMany([
            { nome: 'Celta do Batman', valor: 10.0, empresa: empresa._id },
            { nome: 'Jeep Geek', valor: 25.0, empresa: empresa._id }
        ]);

        await Pedido.create({
            numero: 1,
            cliente: clientes[0]._id,
            empresa: empresa._id,
            produtos: [
                { produto: produtos[0]._id, quantidade: 2 },
                { produto: produtos[1]._id, quantidade: 1 }
            ],
            status: 'pendente'
        });

        console.log('✅ Seed user finalizado com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao executar seedUser:', err.message);
    }
}

async function runSeed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('📦 Conectado ao MongoDB');

        await User.deleteMany();
        await Empresa.deleteMany();
        await Produto.deleteMany();
        await Cliente.deleteMany();
        await Pedido.deleteMany();

        await seedAdmin();
        await seedUser();

        console.log('🎉 Seed concluído com sucesso');
        process.exit();
    } catch (err) {
        console.error('❌ Erro ao conectar ao MongoDB ou executar seed:', err.message);
        process.exit(1);
    }
}

runSeed();