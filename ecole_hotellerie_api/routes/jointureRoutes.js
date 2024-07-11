const express = require('express');
const router = express.Router();
const { getEtudiantClasse,getMatiereClasse,getFormateurMatiere,getinfopay,getinfopaypeso } = require('../controllers/jointureController');
const authenticateJWT = require('../middleware/auth');

router.get('/etudiant-classe/:id', authenticateJWT, getEtudiantClasse);
router.get('/matiere-classe/:id', authenticateJWT, getMatiereClasse);
router.get('/formateur-matiere/:id', authenticateJWT, getFormateurMatiere);
router.get('/pay-etud/', authenticateJWT, getinfopay);
router.get('/pay-perso/', authenticateJWT, getinfopaypeso);


module.exports = router;
