const { Syllabus } = require('../models/Syllabus');

async function getSubjects(grade) {
    try {
        const { subjects } = (await Syllabus.findOne({}, { [`${[grade]}.subjects`]: 1, _id: 0 }).lean())[grade];
        return subjects;
    } catch (error) {
        throw new Error(error);
    }
}

async function getSyllabus(grade, subject) {
    try {
        const syllabus = (await Syllabus.findOne({}, { [`${[grade]}.${[subject]}`]: 1, _id: 0 }).lean())[grade][subject];
        return syllabus;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getSubjects,
    getSyllabus,
};
