const router = require('express').Router();
const { getSubjects, getSyllabus } = require('../controllers/subjects');
const { hasAuthenticated } = require('../middlewares/authentication');

router.use(hasAuthenticated);

router.get('/home', (req, res) => {
    res.render('index');
});

router.get('/subjects', async (req, res) => {
    const courses = await getSubjects(10);
    res.render('subjects', { courses });
});

router.get('/subjects/:subject', async (req, res) => {
    const { subject } = req.params;
    const syllabus = await getSyllabus(10, subject);
    res.render('manage-subject', { course: subject, syllabus });
});

module.exports = router;
