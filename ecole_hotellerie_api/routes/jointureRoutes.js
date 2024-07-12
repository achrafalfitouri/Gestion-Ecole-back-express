const express = require('express');
const router = express.Router();
const { getEtudiantClasse,getMatiereClasse,getFormateurMatiere,getInscriptionEtudiant } = require('../controllers/jointureController');
const authenticateJWT = require('../middleware/auth');

router.get('/etudiant-classe/:id', authenticateJWT, getEtudiantClasse);
router.get('/matiere-classe/:id', authenticateJWT, getMatiereClasse);
router.get('/formateur-matiere/:id', authenticateJWT, getFormateurMatiere);
router.get('/inscription-etudiant/:id', authenticateJWT, getInscriptionEtudiant);


module.exports = router;
