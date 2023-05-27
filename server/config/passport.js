const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Teacher = mongoose.model("teacher-credentials");
const Result = mongoose.model("student-scores");
const Student = mongoose.model("student-credentials");
const keys = require("../config/keys");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Teacher.findById(jwt_payload.id)
                .then(teacher => {
                    if (teacher) {
                        return done(null, teacher);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
            Student.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
            Result.findById(jwt_payload.id)
                .then(result => {
                    if (result) {
                        return done(null, result);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};