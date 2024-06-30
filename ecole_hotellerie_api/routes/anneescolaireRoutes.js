const express = require('express');
const router = express.Router();
const {  getAllAnneeScolaire, getAnneeScolaireById, createAnneeScolaire, updateAnneeScolaireById, deleteAnneeScolaireById  } = require('../controllers/anneescolaireController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllAnneeScolaire);
router.get('/:id', authenticateJWT, getAnneeScolaireById);
router.post('/', authenticateJWT, createAnneeScolaire);
router.put('/:id', authenticateJWT, updateAnneeScolaireById);
router.delete('/:id', authenticateJWT, deleteAnneeScolaireById);

module.exports = router;
