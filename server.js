const createApp = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

createApp().then((app) => {
    const server = app.listen(PORT, () => {
        console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    });

    const shutdown = async (signal) => {
        console.log(`📴 Recebido ${signal}. Encerrando...`);
        server.close(async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
});