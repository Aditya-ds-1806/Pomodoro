const express = require('express');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/dashboard/home');
});

app.get('/dashboard/home', (req, res) => {
    res.render('index');
});

app.get('/dashboard/subjects', (req, res) => {
    res.render('subjects');
});

app.get('/dashboard/subjects/math', (req, res) => {
    res.render('manage-subject');
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});
