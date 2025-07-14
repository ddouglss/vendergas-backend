const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const auth = require('../middlewares/auth');
const authorize = require("../middlewares/authorize");

router.post('/', auth, empresaController.create);
router.get('/', auth, empresaController.getAll);
router.put('/:id', auth, authorize('admin', 'superadmin'), empresaController.update);
router.delete('/empresa/:id', auth, authorize('admin', 'superadmin'), empresaController.deleteEmpresaSimples);
router.delete('/empresa-cascade/:id', auth, authorize('admin', 'superadmin'), empresaController.deleteEmpresaComCascade);

module.exports = router;
