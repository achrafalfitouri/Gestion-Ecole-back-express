const express = require('express');
const router = express.Router();
const {  getAllPersonnels, getPersonnelById, createPersonnel, updatePersonnelsById, deletePersonnelById } = require('../controllers/personnelController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllPersonnels);
router.get('/:id', authenticateJWT, getPersonnelById);
router.post('/', authenticateJWT, createPersonnel);
router.put('/:id', authenticateJWT, updatePersonnelsById);
router.delete('/:id', authenticateJWT, deletePersonnelById);

module.exports = router;
