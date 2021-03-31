const express = require('express');
const { addTopic, revisedTopic, removeTopic } = require('../controllers/topics');
const { hasAuthenticated } = require('../middlewares/authentication');

const router = express.Router();
router.use(hasAuthenticated);
router.use(express.json());

router.post('/addTopic', async (req, res) => {
    const { user } = req;
    const response = await addTopic(user._id, req.body);
    res.send(response);
});

router.post('/revisedTopic', async (req, res) => {
    const { user } = req;
    const response = await revisedTopic(user._id, req.body);
    res.send(response);
});

router.post('/removeTopic', async (req, res) => {
    const { user } = req;
    const response = await removeTopic(user._id, req.body);
    res.send(response);
});

module.exports = router;
