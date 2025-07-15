require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            const isDocker = process.env.RUNNING_IN_DOCKER === 'true';
            mongoUri = isDocker
                ? 'mongodb://mongo:27017/desafio-db'
                : 'mongodb://localhost:27017/desafio-db';
        }

        console.log('Conectando ao MongoDB em:', mongoUri);

        if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
            throw new Error('MONGO_URI inválido. Verifique a variável de ambiente.');
        }

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB conectado com sucesso!');
        return mongoose.connection;
    } catch (err) {
        console.error('❌ Falha na conexão com MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
