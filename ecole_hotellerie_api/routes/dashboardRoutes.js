const express = require('express');
const router = express.Router();
const {  getgain, getexpence, getabsenceinfo, getformateurinfo, getnombreparniveau, getnbetudiantnv,getetudparfiliere,getinscri,getNbrendezvous,getnouveaurendezvous,getYears} = require('../controllers/dashboardController');
const authenticateJWT = require('../middleware/auth');

router.get('/gain', authenticateJWT, getgain);
router.get('/expence', authenticateJWT, getexpence);
router.get('/infoabsence', authenticateJWT, getabsenceinfo);
router.get('/infoformateur', authenticateJWT, getformateurinfo);
router.get('/nbparnv', authenticateJWT, getnombreparniveau);
router.get('/etudparfil/:id', authenticateJWT, getetudparfiliere);
router.get('/inscri', authenticateJWT, getinscri);
router.get('/nbrd', authenticateJWT, getNbrendezvous);
router.get('/nvrd', authenticateJWT, getnouveaurendezvous);
router.get('/nbetudnv', authenticateJWT, getnbetudiantnv);
router.get('/years', authenticateJWT, getYears);


module.exports = router;

