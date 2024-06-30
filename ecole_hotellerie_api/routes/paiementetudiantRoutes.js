const express = require('express');
const router = express.Router();
const { getAllPaiementEtudiants, getPaiementEtudiantsById, createPaiementEtudiants, updatePaiementEtudiantsById, deletePaiementEtudiantsById } = require('../controllers/paiementetudiantController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllPaiementEtudiants);
router.get('/:id', authenticateJWT, getPaiementEtudiantsById);
router.post('/', authenticateJWT, createPaiementEtudiants);
router.put('/:id', authenticateJWT, updatePaiementEtudiantsById);
router.delete('/:id', authenticateJWT, deletePaiementEtudiantsById);

module.exports = router;