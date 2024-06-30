

const express = require('express');
const router = express.Router();
const { getAllMatieres,getMatiereById,createMatiere,updateMatiereById,deleteMatiereById} = require('../controllers/matieresController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllMatieres);
router.get('/:id', authenticateJWT, getMatiereById);
router.post('/', authenticateJWT, createMatiere);
router.put('/:id', authenticateJWT, updateMatiereById);
router.delete('/:id', authenticateJWT, deleteMatiereById);

module.exports = router;
