const express = require('express');
const router = express.Router();
const { getAllPlannings, getPlanningById, createPlanning, updatePlanningById, deletePlanningById } = require('../controllers/planingController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllPlannings);
router.get('/:id', authenticateJWT, getPlanningById);
router.post('/', authenticateJWT, createPlanning);
router.put('/:id', authenticateJWT, updatePlanningById);
router.delete('/:id', authenticateJWT, deletePlanningById);

module.exports = router;
