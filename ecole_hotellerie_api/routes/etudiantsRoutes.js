const express = require('express');
const router = express.Router();
const { getAllEtudiants, getEtudiantById, createEtudiant, updateEtudiantById, deleteEtudiantById, upload } = require('../controllers/etudiantController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllEtudiants);
router.get('/:id', authenticateJWT, getEtudiantById);

// Use upload middleware for photo upload in create and update routes
router.post('/', authenticateJWT, upload.single('PhotoProfil'), createEtudiant);
router.put('/:id', authenticateJWT, upload.single('PhotoProfil'), updateEtudiantById);

router.delete('/:id', authenticateJWT, deleteEtudiantById);

module.exports = router;
