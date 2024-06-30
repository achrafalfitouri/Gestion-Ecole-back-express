const express = require('express');
const router = express.Router();
const { getAllNiveaux, getNiveauById, createNiveau, updateNiveauById, deleteNiveauById } = require('../controllers/niveauController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllNiveaux);
router.get('/:id', authenticateJWT, getNiveauById);
router.post('/', authenticateJWT, createNiveau);
router.put('/:id', authenticateJWT, updateNiveauById);
router.delete('/:id', authenticateJWT, deleteNiveauById);

module.exports = router;