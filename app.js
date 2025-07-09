require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const connectionString = process.env.DATABASE_URL;


const app = express();

app.get("/", (req, res) => {
    res.status(200).json({msg: 'Testando rota '})
})

app.listen(3000)