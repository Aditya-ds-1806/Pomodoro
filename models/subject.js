const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    chapter: String,
    topics: [String],
}, { _id: false });

module.exports = { schema: subjectSchema };
