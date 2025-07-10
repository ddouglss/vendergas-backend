const app = require('./app');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(` Servidor rodando na porta ${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('Recebido SIGTERM. Encerrando servidor...');
    server.close(() => {
        console.log(' Servidor encerrado');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log(' Recebido SIGINT. Encerrando servidor...');
    server.close(() => {
        console.log(' Servidor encerrado');
        process.exit(0);
    });
});