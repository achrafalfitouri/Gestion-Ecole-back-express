const express = require('express');
const router = express.Router();
const {  getAllUtilisateurs, getUtilisateurById, createUtilisateur, updateUtilisateurById, deleteUtilisateurById } = require('../controllers/utilisateursController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllUtilisateurs);
router.get('/:id', authenticateJWT, getUtilisateurById);
router.post('/', authenticateJWT, createUtilisateur);
router.put('/:id', authenticateJWT, updateUtilisateurById);
router.delete('/:id', authenticateJWT, deleteUtilisateurById);

module.exports = router;
