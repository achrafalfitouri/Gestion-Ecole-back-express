

const express = require('express');
const router = express.Router();
const { getAllInscriptions,getInscriptionById,createInscription,updateInscriptionById,deleteInscriptionById} = require('../controllers/inscriptionController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllInscriptions);
router.get('/:id', authenticateJWT, getInscriptionById);
router.post('/', authenticateJWT, createInscription);
router.put('/:id', authenticateJWT, updateInscriptionById);
router.delete('/:id', authenticateJWT, deleteInscriptionById);

module.exports = router;
