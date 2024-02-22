const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

router.get('/etudiants', etudiantController.getEtudiants);
router.get('/etudiants/:id', etudiantController.getEtudiantsById);
router.post('/etudiants', etudiantController.postEtudiants);
router.put('/etudiants/:id', etudiantController.putEtudiants);
router.delete('/etudiants/:id', etudiantController.deleteEtudiants);

module.exports = router;
