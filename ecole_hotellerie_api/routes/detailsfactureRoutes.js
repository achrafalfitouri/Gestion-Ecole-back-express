


const express = require('express');
const router = express.Router();
const { getAlldetailsfacture, getdetailsfactureById, createdetailsfacture, updatedetailsfactureById, deletedetailsfactureById} = require('../controllers/detailsfactureController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAlldetailsfacture);
router.get('/:id', authenticateJWT, getdetailsfactureById);
router.post('/', authenticateJWT, createdetailsfacture);
router.put('/:id', authenticateJWT, updatedetailsfactureById);
router.delete('/:id', authenticateJWT, deletedetailsfactureById);

module.exports = router;
