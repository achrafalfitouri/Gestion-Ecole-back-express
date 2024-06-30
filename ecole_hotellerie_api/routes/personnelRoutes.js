const express = require('express');
const router = express.Router();
const {  getAllPersonnel, getPersonnelById, createPersonnel, updatePersonnelById, deletePersonnelById } = require('../controllers/personnelController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllPersonnel);
router.get('/:id', authenticateJWT, getPersonnelById);
router.post('/', authenticateJWT, createPersonnel);
router.put('/:id', authenticateJWT, updatePersonnelById);
router.delete('/:id', authenticateJWT, deletePersonnelById);

module.exports = router;
