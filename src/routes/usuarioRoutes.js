const express = require('express');
const router = express.Router();
const authController = require('src/controllers/authController');
const usuarioController = require('src/controllers/usuarioController');
const authorize = require('src/middlewares/authorize');
const auth = require("src/middlewares/auth");

router.post('/cadastrar', authController.register);
router.post('/login', authController.login);
router.put('/:id',auth ,authorize('admin', 'superadmin'), authController.update);
router.put('/update-role/:id', auth, authorize('admin','superadmin'), usuarioController.updateRole);
router.delete('/:id',  auth , authorize('admin', 'superadmin'), authController.delete);
router.delete('/usuario-cascade/:id', auth , authorize('admin', 'superadmin'), authController.deleteWithCascade);
router.put('/change-password/:id', auth, authorize('admin', 'superadmin'), authController.changePassword);
router.get('/debug', (req, res) => res.send('Usuário routes OK!'));

module.exports = router;