const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/desafio-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB conectado com sucesso!`);
        return mongoose.connection;
    } catch (err) {
        console.error('❌ Falha na conexão com MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
