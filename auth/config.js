const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models/User');

const { CLIENT_ID, CLIENT_SECRET } = process.env;

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ email: profile.emails[0].value }).lean();
        if (user) return done(null, user);
        const newUser = await User.create({
            name: profile.displayName,
            avatar: profile.photos[0].value,
            grade: 10,
            email: profile.emails[0].value,
            googleID: profile.id,
        });
        return done(null, newUser);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
