const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    chapter: String,
    topics: [String],
    weightage: Number,
}, { _id: false });

module.exports = { schema: subjectSchema };
