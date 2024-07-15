
const express = require('express');
const router = express.Router();
const { getAllfactures, getfacturesById, createfactures, updatefacturesById, deletefacturesById,getAllfactures2} = require('../controllers/facturesController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllfactures);
router.get('/etud', authenticateJWT, getAllfactures2);
router.get('/:id', authenticateJWT, getfacturesById);
router.post('/', authenticateJWT, createfactures);
router.put('/:id', authenticateJWT, updatefacturesById);
router.delete('/:id', authenticateJWT, deletefacturesById);

module.exports = router;