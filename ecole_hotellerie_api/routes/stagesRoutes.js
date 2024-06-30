const express = require('express');
const router = express.Router();
const {  getAllStages, getStageById, createStage, updateStageById, deleteStageById } = require('../controllers/stagesController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllStages);
router.get('/:id', authenticateJWT, getStageById);
router.post('/', authenticateJWT, createStage);
router.put('/:id', authenticateJWT, updateStageById);
router.delete('/:id', authenticateJWT, deleteStageById);

module.exports = router;
