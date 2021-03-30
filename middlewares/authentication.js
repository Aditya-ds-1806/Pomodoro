function hasAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.redirect('/login');
}

function hasNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) return next();
    return res.redirect('back');
}

module.exports = {
    hasAuthenticated,
    hasNotAuthenticated,
};
