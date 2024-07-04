


const express = require('express');
const router = express.Router();
const { getAllFormateurs, getFormateurById, createFormateur, updateFormateurById, deleteFormateurById,upload  } = require('../controllers/formateuresController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllFormateurs);
router.get('/:id', authenticateJWT, getFormateurById);
router.post('/', authenticateJWT,upload.single('PhotoProfil'), createFormateur);
router.put('/:id', authenticateJWT,upload.single('PhotoProfil'), updateFormateurById);
router.delete('/:id', authenticateJWT, deleteFormateurById);

module.exports = router;
