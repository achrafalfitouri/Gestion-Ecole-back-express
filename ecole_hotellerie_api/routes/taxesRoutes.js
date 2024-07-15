const express = require('express');
const router = express.Router();
const {  getAllTaxes, getTaxesById, createTaxes,updateTaxesById, deleteTaxesById } = require('../controllers/taxesController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllTaxes);
router.get('/:id', authenticateJWT, getTaxesById);
router.post('/', authenticateJWT, createTaxes);
router.put('/:id', authenticateJWT, updateTaxesById);
router.delete('/:id', authenticateJWT, deleteTaxesById);

module.exports = router;
