const express = require('express');
const router = express.Router();
const { getEtudiantClasse } = require('../controllers/jointureController');
const authenticateJWT = require('../middleware/auth');

router.get('/etudiant-classe/:id', authenticateJWT, getEtudiantClasse);

module.exports = router;
