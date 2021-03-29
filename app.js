require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { getSubjects, getSyllabus } = require('./controllers/subjects');

const app = express();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}, (err) => {
    if (err) throw new Error(err);
    console.log('Connected to DB');
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/dashboard/home');
});

app.get('/dashboard/home', (req, res) => {
    res.render('index');
});

app.get('/dashboard/subjects', async (req, res) => {
    const courses = await getSubjects(10);
    res.render('subjects', { courses });
});

app.get('/dashboard/subjects/:subject', async (req, res) => {
    const { subject } = req.params;
    const syllabus = await getSyllabus(10, subject);
    res.render('manage-subject', { course: subject, syllabus });
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});
