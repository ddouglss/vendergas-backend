const express = require('express');
const router = express.Router();
const pedidoController = require('src/controllers/pedidoController');
const auth = require('src/middlewares/auth');
const authorize = require("src/middlewares/authorize");

router.post('/', auth, pedidoController.create);
router.get('/:empresaId', auth,pedidoController.getByEmpresa);
router.put('/:id', auth, authorize('admin', 'superadmin'), pedidoController.update);
router.delete('/:id', auth, authorize('admin', 'superadmin'), pedidoController.delete);

module.exports = router;
