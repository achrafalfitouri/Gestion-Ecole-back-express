
const express = require('express');
const router = express.Router();
const { getAllfactures, getfacturesById, createfactures, updatefacturesById, deletefacturesById} = require('../controllers/facturesController');
const authenticateJWT = require('../middleware/auth');

router.get('/', authenticateJWT, getAllfactures);
router.get('/:id', authenticateJWT, getfacturesById);
router.post('/', authenticateJWT, createfactures);
router.put('/:id', authenticateJWT, updatefacturesById);
router.delete('/:id', authenticateJWT, deletefacturesById);

module.exports = router;