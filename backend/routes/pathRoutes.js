const express = require('express');
const router = express.Router();
const pathController = require('../controllers/pathController');
const authMiddleware = require('../middleware/auth');
const { verifyToken } = require('../services/jwtService');

// Optional auth helper for public endpoints
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            req.user = verifyToken(token);
        } catch (e) {
            // Ignore invalid optional token
        }
    }
    next();
};

router.get('/', pathController.getAllPaths);
router.get('/:id', optionalAuth, pathController.getPathById);
router.post('/', authMiddleware, pathController.createPath);

module.exports = router;
