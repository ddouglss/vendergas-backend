require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/desafio-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado ao mongo'))
    .catch(err => console.error("Erro ao conectar ao MongoDB:",err));

app.get("/health", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado';
    res.status(200).json({status: 'UP',
        database: dbStatus,
        container: process.env.HOSTNAME || 'local',
    })
})

app.get('/', (req, res) => {
    res.json({
        msg: 'API rodando no Docker! ',
        instructions: 'Use /api/auth para autenticação'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno no container Docker'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Container rodando na porta ${PORT}`);
});