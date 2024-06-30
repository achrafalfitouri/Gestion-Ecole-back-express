const express = require('express');
const router = express.Router();
const { getAllPaiementPersonnel, getPaiementPersonnelById, createPaiementPersonnel, updatePaiementPersonnelById, deletePaiementPersonnelById } = require('../controllers/paiementpersonnelController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllPaiementPersonnel);
router.get('/:id', authenticateJWT, getPaiementPersonnelById);
router.post('/', authenticateJWT, createPaiementPersonnel);
router.put('/:id', authenticateJWT, updatePaiementPersonnelById);
router.delete('/:id', authenticateJWT, deletePaiementPersonnelById);

module.exports = router;