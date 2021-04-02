const { User } = require('../models/User');

async function addTopic(userID, { chapter, topic }) {
    try {
        if (await User.exists({ _id: userID, 'revised.chapter': chapter, 'revised.topic': topic })) {
            await User.findByIdAndUpdate(userID, {
                $addToSet: {
                    revising: { chapter, topic },
                },
                $pull: {
                    revised: { chapter, topic },
                },
            });
            await User.findByIdAndUpdate(userID, {
                $addToSet: {
                    revised: { chapter, topic, date: Date.now() },
                },
            });
            return JSON.stringify({
                status: 200,
                message: 'Updated list of revising topics',
            });
        }
        await User.findByIdAndUpdate(userID, {
            $addToSet: {
                new: { chapter, topic },
            },
        });
        return JSON.stringify({
            status: 200,
            message: 'Updated list of new topics',
        });
    } catch (err) {
        console.log(err);
        return JSON.stringify({
            status: 500,
            reason: new Error(err).message,
        });
    }
}

async function revisedTopic(userID, { chapter, topic }) {
    try {
        await User.findByIdAndUpdate(userID, {
            $pull: {
                new: { chapter, topic },
                revising: { chapter, topic },
                revised: { chapter, topic },
            },
        });
        await User.findByIdAndUpdate(userID, {
            $addToSet: {
                revised: { chapter, topic, date: Date.now() },
            },
        });
        return JSON.stringify({
            status: 200,
            message: 'Added topic to revised',
        });
    } catch (err) {
        console.log(err);
        return JSON.stringify({
            status: 500,
            reason: new Error(err).message,
        });
    }
}

async function getNewTopics(userID) {
    try {
        const { new: newTopics } = await User.findById(userID, { new: 1, _id: 0 });
        return newTopics;
    } catch (err) {
        console.log(err);
        return JSON.stringify({
            status: 500,
            reason: new Error(err).message,
        });
    }
}

async function getRevisingTopics(userID) {
    try {
        const { revising } = await User.findById(userID, { revising: 1, _id: 0 });
        return revising;
    } catch (err) {
        console.log(err);
        return JSON.stringify({
            status: 500,
            reason: new Error(err).message,
        });
    }
}

async function getRevisedTopics(userID) {
    try {
        const { revised } = await User.findById(userID, { revised: 1, _id: 0 });
        return revised;
    } catch (err) {
        console.log(err);
        return JSON.stringify({
            status: 500,
            reason: new Error(err).message,
        });
    }
}

async function removeTopic(userID, { topic, chapter }) {
    try {
        await User.findByIdAndUpdate(userID, {
            $pull: {
                new: { chapter, topic },
                revising: { chapter, topic },
            },
        });
        return JSON.stringify({
            status: 200,
            message: 'Removed topic',
        });
    } catch (err) {
        console.log(err);
        return JSON.stringify({
            status: 500,
            reason: new Error(err).message,
        });
    }
}

module.exports = {
    addTopic,
    revisedTopic,
    getNewTopics,
    getRevisingTopics,
    getRevisedTopics,
    removeTopic,
};
