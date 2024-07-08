const express = require('express');
const router = express.Router();
const {  getAllPersonnel, getPersonnelById, createPersonnel, updatePersonnelById, deletePersonnelById,upload } = require('../controllers/personnelController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllPersonnel);
router.get('/:id', authenticateJWT, getPersonnelById);
router.post('/', authenticateJWT,upload.single('PhotoProfil'), createPersonnel);
router.put('/:id', authenticateJWT,upload.single('PhotoProfil'), updatePersonnelById);
router.delete('/:id', authenticateJWT, deletePersonnelById);

module.exports = router;
