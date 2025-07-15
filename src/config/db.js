const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI
            || 'mongodb://localhost:27017/desafio-db'
            || 'mongodb://mongo:27017/desafio-db';

        console.log('Conectando ao MongoDB em:', mongoUri);

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
