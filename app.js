require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const topicRoutes = require('./routes/topic-routes');
require('./auth/config');

const app = express();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, (err) => {
    if (err) throw new Error(err);
    console.log('Connected to DB');
});

app.use(express.static('public'));
app.use(session({
    name: 'Pomodoro',
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', authRoutes);
app.use('/', topicRoutes);
app.use('/dashboard', dashboardRoutes);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});
