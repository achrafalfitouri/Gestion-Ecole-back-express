


const express = require('express');
const router = express.Router();
const { getAllFormateurs, getFormateurById, createFormateur, updateFormateurById, deleteFormateurById } = require('../controllers/formateuresController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllFormateurs);
router.get('/:id', authenticateJWT, getFormateurById);
router.post('/', authenticateJWT, createFormateur);
router.put('/:id', authenticateJWT, updateFormateurById);
router.delete('/:id', authenticateJWT, deleteFormateurById);

module.exports = router;
