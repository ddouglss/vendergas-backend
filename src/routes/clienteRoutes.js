const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const auth = require('../middlewares/auth');
const authorize = require("../middlewares/authorize");

router.post('/',auth, clienteController.create);
router.get('/', auth, clienteController.getAllClient);
router.get('/empresa/:empresaId', auth, clienteController.getByEmpresa);
router.put('/:id', auth, authorize('admin', 'superadmin'), clienteController.update);
router.delete('/:id', auth, authorize('admin', 'superadmin'), clienteController.delete);

module.exports = router;
