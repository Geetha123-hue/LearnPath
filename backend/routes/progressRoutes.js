const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', progressController.getUserProgress);
router.post('/enroll/:pathId', progressController.enrollInPath);
router.post('/toggle-step', progressController.toggleStep);

module.exports = router;
