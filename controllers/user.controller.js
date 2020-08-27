const User = require('./../models/user.model');
const bcrypt = require('bcrypt');
const jwtUtils = require('./../utils/jwt.util');
const passport = require('passport');
// let config = require('./../config/passport');
// config(passport);
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const PUB_KEY = "THIS_IS_A_KEY";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY
};

passport.use(new JWTStrategy(options, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload.sub}, (err, user) => {
        if(err) return done(err, false);

        if(user) return done(null, user);
        else return done(null, false);
    });
}));

exports.createUser = async (req, res, next) => {
    try {
        if(!req.body.email || !req.body.password) {
            throw new Error('Wrong Credentials')
        }
        const password = req.body.password;
        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);
        const newUser = {
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        const saveUser = await User.create(newUser);
        res.send(saveUser);
        
    } catch (error) {
        res.send(500, error.message);
    }
};

exports.getUserDetails =  (passport.authenticate('jwt', {
    session: false}), async (req, res, next) => {
        try {
            const email = req.params.email;
            const user = await User.findOne({email: email});
            res.send(user);
        } catch (error) {
            res.send(500, error.message)
        }
});

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await User.findOne({email: email});
        console.log('RESULTTTTTTTTTTTTTTTTTTTTTTT', result);
        if(!result) throw new Error({code: 401, message: 'User Not Found'});
        
        const isValid = await jwtUtils.validPassword(password, result.password);
        
        if (isValid) {
            const tokenObject = jwtUtils.issueJWT(result);
            res.status(200).json({success: true, token: tokenObject.token, expiresIn: tokenObject.expires})
        } else {
            res.status(200).json({success: false, msg: "you entered the wrong password"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};