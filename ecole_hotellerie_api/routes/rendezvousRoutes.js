const express = require('express');
const router = express.Router();
const {
    getAllRendezvous,
    getRendezvousById,
    createRendezvous,
    updateRendezvousById,
    deleteRendezvousById
} = require('../controllers/rendezvousController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllRendezvous);
router.get('/:id', authenticateJWT, getRendezvousById);
router.post('/', authenticateJWT, createRendezvous);
router.put('/:id', authenticateJWT, updateRendezvousById);
router.delete('/:id', authenticateJWT, deleteRendezvousById);

module.exports = router;
