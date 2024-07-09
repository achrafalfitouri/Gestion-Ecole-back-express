
const express = require('express');
const router = express.Router();
const {  getAllclasses, getclassesById, createclasses, updateclassesById, deleteclassesById, getAllclasses2} = require('../controllers/classesControllers');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllclasses);
router.get('/all', authenticateJWT, getAllclasses2);
router.get('/:id', authenticateJWT, getclassesById);
router.post('/', authenticateJWT, createclasses);
router.put('/:id', authenticateJWT, updateclassesById);
router.delete('/:id', authenticateJWT, deleteclassesById);

module.exports = router;
