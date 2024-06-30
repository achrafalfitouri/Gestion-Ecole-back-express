



const express = require('express');
const router = express.Router();
const { getAllevaluationsstage, getevaluationsstageById, createevaluationsstage, updateevaluationsstageById, deleteevaluationsstageById} = require('../controllers/evaluationetudiantstageController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllevaluationsstage);
router.get('/:id', authenticateJWT, getevaluationsstageById);
router.post('/', authenticateJWT, createevaluationsstage);
router.put('/:id', authenticateJWT, updateevaluationsstageById);
router.delete('/:id', authenticateJWT, deleteevaluationsstageById);

module.exports = router;
