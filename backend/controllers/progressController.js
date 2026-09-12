const progressModel = require('../models/progressModel');
const pathModel = require('../models/pathModel');
const { formatPathWithProgress } = require('../services/pathService');

exports.getUserProgress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const enrolledPaths = await progressModel.getEnrolledPaths(userId);
        const completedStepIds = await progressModel.getCompletedStepIds(userId);

        const detailedPaths = [];
        for (let p of enrolledPaths) {
            const fullPath = await pathModel.getById(p.id);
            if (fullPath) {
                const formatted = formatPathWithProgress(fullPath, fullPath.modules, completedStepIds);
                detailedPaths.push(formatted);
            }
        }

        res.json({
            enrolledCount: enrolledPaths.length,
            completedStepCount: completedStepIds.length,
            completedStepIds,
            paths: detailedPaths
        });
    } catch (err) {
        next(err);
    }
};

exports.enrollInPath = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { pathId } = req.params;

        const path = await pathModel.getById(pathId);
        if (!path) {
            return res.status(404).json({ error: 'Learning path not found.' });
        }

        await progressModel.enroll(userId, pathId);
        res.json({ message: 'Successfully enrolled in learning path!', pathId });
    } catch (err) {
        next(err);
    }
};

exports.toggleStep = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { stepId } = req.body;

        if (!stepId) {
            return res.status(400).json({ error: 'Step ID is required.' });
        }

        const result = await progressModel.toggleStepCompletion(userId, stepId);
        res.json({
            stepId,
            completed: result.completed,
            message: result.completed ? 'Step marked as complete' : 'Step marked as incomplete'
        });
    } catch (err) {
        next(err);
    }
};
