const moment = require('moment');
const express = require('express');

const router = express.Router();
const { getSubjects, getSyllabus } = require('../controllers/subjects');
const { getNewTopics, getRevisingTopics, getRevisedTopics } = require('../controllers/topics');
const { hasAuthenticated } = require('../middlewares/authentication');
const { updateGradeAndCycle } = require('../controllers/users');
const { hasOnboarded, hasNotOnboarded } = require('../middlewares/onboarding');

router.use(hasAuthenticated);

router.get('/get-started', hasNotOnboarded, (req, res) => {
    console.log('get-started');
    res.render('onboarding', { avatar: req.user.avatar, home: true });
});

router.post('/get-started', hasNotOnboarded, express.urlencoded({ extended: true }), async (req, res) => {
    await updateGradeAndCycle(req.user._id, req.body);
    res.redirect('/dashboard/home');
});

router.get('/home', hasOnboarded, async (req, res) => {
    const newTopics = await getNewTopics(req.user._id);
    const revisingTopics = await getRevisingTopics(req.user._id);
    res.render('index', {
        avatar: req.user.avatar,
        grade: req.user.grade,
        newTopics,
        revisingTopics,
    });
});

router.get('/subjects', hasOnboarded, async (req, res) => {
    const { grade } = req.user;
    const courses = await getSubjects(grade);
    res.render('subjects', { courses, avatar: req.user.avatar, grade: req.user.grade });
});

router.get('/subjects/:subject', hasOnboarded, async (req, res) => {
    const { user } = req;
    const { grade } = user;
    const { subject } = req.params;
    const syllabus = await getSyllabus(grade, subject);
    const revisedTopics = await getRevisedTopics(user._id);
    syllabus.map((entry) => {
        /* eslint-disable no-param-reassign */
        entry.lastRevised = moment(revisedTopics
            .filter(({ chapter }) => entry.chapter === chapter)
            .sort(({ date: date1 }, { date: date2 }) => date1 - date2)
            ?.pop()?.date || null).fromNow();
        if (entry.lastRevised === 'Invalid date') entry.lastRevised = 'Never';
        return entry;
        /* eslint-enable no-param-reassign */
    });
    res.render('manage-subject', {
        course: subject,
        syllabus,
        avatar: req.user.avatar,
        grade: req.user.grade,
    });
});

module.exports = router;
