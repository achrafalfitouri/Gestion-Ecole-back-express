const express = require('express');
const router = express.Router();
const {  getAllTypePaiement, getTypePaiementById, createTypePaiement, updateTypePaiementById, deleteTypePaiementById } = require('../controllers/typepaiementController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllTypePaiement);
router.get('/:id', authenticateJWT, getTypePaiementById);
router.post('/', authenticateJWT, createTypePaiement);
router.put('/:id', authenticateJWT, updateTypePaiementById);
router.delete('/:id', authenticateJWT, deleteTypePaiementById);

module.exports = router;
