const mongoose = require('mongoose');
const { schema: subjectSchema } = require('./subject');

const syllabusSchema = new mongoose.Schema({
    10: {
        subjects: [String],
        mathematics: [subjectSchema],
        science: [subjectSchema],
        history: [subjectSchema],
        civics: [subjectSchema],
        geography: [subjectSchema],
    },
}, {
    capped: {
        max: 1,
        size: 1024 * 10 ** 4,
    },
});

const Syllabus = mongoose.model('Syllabus', syllabusSchema);

module.exports = {
    schema: syllabusSchema,
    Syllabus,
};
