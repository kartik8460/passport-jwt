const User = require('./../models/user.model');
const jwtUtils = require('../utils/jwt.util');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const PUB_KEY = "THIS_IS_A_KEY";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY
};

passport.use(new JWTStrategy(options, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload.sub}, (err, user) => {
        console.log(jwt_payload);
        if(err) return done(err, false);

        if(user) return done(null, user);
        else return done(null, false);
    });
}));

module.exports = passport.authenticate('jwt', { session: false });