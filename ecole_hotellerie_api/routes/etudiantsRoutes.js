const express = require('express');
const router = express.Router();
const { getAllEtudiants, getEtudiantById, createEtudiant, updateEtudiantById, deleteEtudiantById } = require('../controllers/etudiantController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllEtudiants);
router.get('/:id', authenticateJWT, getEtudiantById);
router.post('/', authenticateJWT, createEtudiant);
router.put('/:id', authenticateJWT, updateEtudiantById);
router.delete('/:id', authenticateJWT, deleteEtudiantById);

module.exports = router;
