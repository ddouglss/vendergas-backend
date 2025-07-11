const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/desafio-db';

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const { host, port, name } = mongoose.connection;
        console.log(`✅ MongoDB conectado em: ${host}:${port}/${name}`);

        return mongoose.connection;
    } catch (err) {
        console.error('❌ Falha na conexão com MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
