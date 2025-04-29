const express = require('express');
const router = express.Router();
const congeController = require('../controllers/congeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/demander', authMiddleware, congeController.demanderConge);
router.get('/liste', authMiddleware, congeController.listerConges);
// router.put('/valider/:id', authMiddleware, congeController.validerConge);
// router.put('/refuser/:id', authMiddleware, congeController.refuserConge);
// router.get('/soldes/:id', authMiddleware, congeController.consulterSoldes);

module.exports = router;
