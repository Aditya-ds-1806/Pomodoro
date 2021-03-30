const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    grade: Number,
    newTopics: [String],
    revision: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = {
    schema: userSchema,
    User,
};
