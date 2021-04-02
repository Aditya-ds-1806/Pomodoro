const moment = require('moment');
const router = require('express').Router();
const { getSubjects, getSyllabus } = require('../controllers/subjects');
const { getNewTopics, getRevisingTopics, getRevisedTopics } = require('../controllers/topics');
const { hasAuthenticated } = require('../middlewares/authentication');

router.use(hasAuthenticated);

router.get('/home', async (req, res) => {
    const newTopics = await getNewTopics(req.user._id);
    const revisingTopics = await getRevisingTopics(req.user._id);
    res.render('index', { avatar: req.user.avatar, newTopics, revisingTopics });
});

router.get('/subjects', async (req, res) => {
    const courses = await getSubjects(10);
    res.render('subjects', { courses, avatar: req.user.avatar });
});

router.get('/subjects/:subject', async (req, res) => {
    const { user } = req;
    const { subject } = req.params;
    const syllabus = await getSyllabus(10, subject);
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
    console.log(syllabus);
    res.render('manage-subject', { course: subject, syllabus, avatar: req.user.avatar });
});

module.exports = router;
