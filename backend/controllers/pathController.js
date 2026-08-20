const pathModel = require('../models/pathModel');
const progressModel = require('../models/progressModel');
const { formatPathWithProgress } = require('../services/pathService');

exports.getAllPaths = async (req, res, next) => {
    try {
        const paths = await pathModel.getAll();
        res.json({ paths });
    } catch (err) {
        next(err);
    }
};

exports.getPathById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user ? req.user.id : null;

        const path = await pathModel.getById(id);
        if (!path) {
            return res.status(404).json({ error: 'Learning path not found.' });
        }

        let isEnrolled = false;
        let completedStepIds = [];

        if (userId) {
            isEnrolled = await progressModel.isEnrolled(userId, id);
            completedStepIds = await progressModel.getCompletedStepIds(userId);
        }

        const formattedPath = formatPathWithProgress(path, path.modules, completedStepIds);
        formattedPath.isEnrolled = isEnrolled;

        res.json({ path: formattedPath });
    } catch (err) {
        next(err);
    }
};

exports.createPath = async (req, res, next) => {
    try {
        const { title, description, category, difficulty, estimatedHours, coverImage, modules } = req.body;
        const creatorId = req.user.id;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required.' });
        }

        const pathId = await pathModel.createPath({
            title,
            description,
            category,
            difficulty,
            estimatedHours,
            coverImage,
            creatorId
        });

        if (Array.isArray(modules)) {
            for (let mIdx = 0; mIdx < modules.length; mIdx++) {
                const mod = modules[mIdx];
                const moduleId = await pathModel.createModule({
                    pathId,
                    title: mod.title,
                    description: mod.description,
                    orderIndex: mIdx + 1
                });

                if (Array.isArray(mod.steps)) {
                    for (let sIdx = 0; sIdx < mod.steps.length; sIdx++) {
                        const step = mod.steps[sIdx];
                        await pathModel.createStep({
                            moduleId,
                            title: step.title,
                            resourceType: step.resourceType,
                            resourceUrl: step.resourceUrl,
                            estimatedMinutes: step.estimatedMinutes,
                            orderIndex: sIdx + 1
                        });
                    }
                }
            }
        }

        // Auto-enroll creator
        await progressModel.enroll(creatorId, pathId);

        const createdPath = await pathModel.getById(pathId);
        res.status(201).json({
            message: 'Learning path created successfully!',
            path: createdPath
        });
    } catch (err) {
        next(err);
    }
};
