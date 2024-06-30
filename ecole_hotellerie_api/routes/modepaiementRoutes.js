const express = require('express');
const router = express.Router();
const { getAllModePaiement, getModePaiementById, createModePaiement, updateModePaiementById, deleteModePaiementById } = require('../controllers/modepaiementController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllModePaiement);
router.get('/:id', authenticateJWT, getModePaiementById);
router.post('/', authenticateJWT, createModePaiement);
router.put('/:id', authenticateJWT, updateModePaiementById);
router.delete('/:id', authenticateJWT, deleteModePaiementById);

module.exports = router;
