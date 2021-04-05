const { User } = require('../models/User');

async function updateGradeAndCycle(id, { grade, cycle: revisionCycle }) {
    return User.findOneAndUpdate({ _id: id }, {
        grade: Number(grade),
        revisionCycle: Number(revisionCycle),
        onboarding: true,
    });
}

module.exports = {
    updateGradeAndCycle,
};
