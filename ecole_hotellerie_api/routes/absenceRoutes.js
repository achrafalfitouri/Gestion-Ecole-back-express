const express = require('express');
const router = express.Router();
const {  getAllAbsence, getAbsence, createAbsence, updateAbsenceById, deleteAbsenceById } = require('../controllers/absenceController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllAbsence);
router.get('/:id', authenticateJWT, getAbsence);
router.post('/', authenticateJWT, createAbsence);
router.put('/:id', authenticateJWT, updateAbsenceById);
router.delete('/:id', authenticateJWT, deleteAbsenceById);

module.exports = router;
