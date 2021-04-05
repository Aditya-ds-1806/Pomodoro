const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    grade: Number,
    email: String,
    googleID: String,
    onboarding: {
        type: Boolean,
        default: false,
    },
    revisionCycle: Number,
    new: [{
        chapter: String,
        topic: String,
        _id: false,
    }],
    revising: [{
        chapter: String,
        topic: String,
        _id: false,
    }],
    revised: [{
        chapter: String,
        topic: String,
        date: Date,
        _id: false,
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = {
    schema: userSchema,
    User,
};
