const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

router.post('/cadastrar', authController.cadastrar);
router.post('/login', authController.login);
router.get('/debug', (req, res) => res.send('Usuário routes OK!'));

module.exports = router;
