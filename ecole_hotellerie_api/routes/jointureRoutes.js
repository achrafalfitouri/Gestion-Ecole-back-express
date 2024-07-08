const express = require('express');
const router = express.Router();
const { getEtudiantClasse,getMatiereClasse,getFormateurMatiere } = require('../controllers/jointureController');
const authenticateJWT = require('../middleware/auth');

router.get('/etudiant-classe/:id', authenticateJWT, getEtudiantClasse);
router.get('/matiere-classe/:id', authenticateJWT, getMatiereClasse);
router.get('/formateur-matiere/:id', authenticateJWT, getFormateurMatiere);

module.exports = router;
