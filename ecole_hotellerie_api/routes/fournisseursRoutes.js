

const express = require('express');
const router = express.Router();
const { getAllFournisseurs,getFournisseurById,createFournisseur,updateFournisseurById,deleteFournisseurById} = require('../controllers/fournisseursController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllFournisseurs);
router.get('/:id', authenticateJWT, getFournisseurById);
router.post('/', authenticateJWT, createFournisseur);
router.put('/:id', authenticateJWT, updateFournisseurById);
router.delete('/:id', authenticateJWT, deleteFournisseurById);

module.exports = router;
