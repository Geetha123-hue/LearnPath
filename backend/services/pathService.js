// Helper logic for formatting learning paths and calculating completion stats

exports.formatPathWithProgress = (path, modules, completedStepIds = []) => {
    let totalSteps = 0;
    let completedSteps = 0;

    const formattedModules = modules.map(mod => {
        const modSteps = (mod.steps || []).map(step => {
            totalSteps++;
            const isCompleted = completedStepIds.includes(step.id);
            if (isCompleted) completedSteps++;
            return { ...step, completed: isCompleted };
        });
        return { ...mod, steps: modSteps };
    });

    const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

    return {
        ...path,
        totalSteps,
        completedSteps,
        progressPercentage,
        modules: formattedModules
    };
};
