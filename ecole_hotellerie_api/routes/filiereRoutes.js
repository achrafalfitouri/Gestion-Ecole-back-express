
 
const express = require('express');
const router = express.Router();
const { getAllFiliere,getFiliereById,createFiliere,updateFiliereById,deleteFiliereById,getAllFiliereCountEtudiant} = require('../controllers/filiereController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllFiliere);
router.get('/:id', authenticateJWT, getFiliereById);
router.post('/', authenticateJWT, createFiliere);
router.put('/:id', authenticateJWT, updateFiliereById);
router.delete('/:id', authenticateJWT, deleteFiliereById);

module.exports = router;