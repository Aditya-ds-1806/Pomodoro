const router = require('express').Router();
const passport = require('passport');
const { hasAuthenticated, hasNotAuthenticated } = require('../middlewares/authentication');

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/dashboard/home');
    return res.render('login');
});

router.get('/auth/google', hasNotAuthenticated, passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

router.get('/auth/google/callback', hasNotAuthenticated, passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dashboard/home');
});

router.get('/logout', hasAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
