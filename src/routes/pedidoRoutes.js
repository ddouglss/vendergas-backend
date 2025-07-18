const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middlewares/auth');
const authorize = require("../middlewares/authorize");

router.post('/', auth, pedidoController.create);
router.get('/empresa/:empresaId', auth,pedidoController.getByEmpresa);
router.put('/:id', auth, authorize('admin', 'superadmin'), pedidoController.update);
router.delete('/:id', auth, authorize('admin', 'superadmin'), pedidoController.delete);

module.exports = router;
