const express = require('express');
const router = express.Router();
const { getAllSalles, getSalleById, createSalle, updateSalleById, deleteSalleById } = require('../controllers/salleController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllSalles);
router.get('/:id', authenticateJWT, getSalleById);
router.post('/', authenticateJWT, createSalle);
router.put('/:id', authenticateJWT, updateSalleById);
router.delete('/:id', authenticateJWT, deleteSalleById);

module.exports = router;
