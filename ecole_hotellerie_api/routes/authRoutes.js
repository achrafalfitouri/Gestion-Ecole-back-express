const express = require('express');
const router = express.Router();
const { register, login, getAuthenticatedUser,refreshToken } = require('../controllers/authController');
const authenticateJWT = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/me', authenticateJWT, getAuthenticatedUser); // New endpoint to get authenticated user data

module.exports = router;
