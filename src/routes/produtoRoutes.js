const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

router.post('/', auth, produtoController.create);
router.get('/:empresaId', auth, produtoController.getByEmpresa);
router.put('/:id', auth, authorize('admin', 'superadmin'), produtoController.update);
router.delete('/:id', auth, authorize('admin', 'superadmin'), produtoController.delete);

module.exports = router;
