function hasOnboarded(req, res, next) {
    if (req.user.onboarding) return next();
    return res.redirect('/dashboard/get-started');
}

function hasNotOnboarded(req, res, next) {
    if (req.user.onboarding) return res.redirect('/dashboard/home');
    return next();
}

module.exports = {
    hasOnboarded,
    hasNotOnboarded,
};
