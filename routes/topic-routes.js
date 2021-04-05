const express = require('express');
const {
    addTopic,
    revisedTopic,
    removeTopic,
    getRevisedTopics,
} = require('../controllers/topics');
const { getSyllabus } = require('../controllers/subjects');
const { hasAuthenticated } = require('../middlewares/authentication');
const { hasOnboarded } = require('../middlewares/onboarding');

const router = express.Router();
router.use(hasAuthenticated);
router.use(express.json());

router.post('/addTopic', hasOnboarded, async (req, res) => {
    const { user } = req;
    const response = await addTopic(user._id, req.body);
    res.send(response);
});

router.post('/revisedTopic', hasOnboarded, async (req, res) => {
    const { user } = req;
    const response = await revisedTopic(user._id, req.body);
    res.send(response);
});

router.post('/removeTopic', hasOnboarded, async (req, res) => {
    const { user } = req;
    const response = await removeTopic(user._id, req.body);
    res.send(response);
});

router.get('/revisedTopic', hasOnboarded, async (req, res) => {
    const { user } = req;
    const revisedTopics = await getRevisedTopics(user._id);
    res.send(JSON.stringify({
        topics: revisedTopics,
        revisionCycle: req.user.revisionCycle,
    }));
});

router.get('/markDistribution/:grade/:subject', hasOnboarded, async (req, res) => {
    const { grade, subject } = req.params;
    const syllabus = await getSyllabus(grade, subject);
    res.send({
        x: syllabus.map(({ chapter }) => chapter),
        y: syllabus.map(({ weightage }) => weightage),
    });
});

module.exports = router;
