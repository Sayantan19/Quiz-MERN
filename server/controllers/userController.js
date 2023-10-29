const User = require("../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateLoginInput = require("../validation/login");
const Redis = require('ioredis');
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/register");

const OTPSignIn = async (req, res) => {
    const redis = new Redis();

    if (!req.body.email) {
        return res.status(400).send('Email empty!');
    }

    const email = req.body.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('Email not found');
        }

        const value = await redis.get(email);

        if (value) {
            console.log('Retrieved value:', value);

            if (value === req.body.otp) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 // 1 hr in seconds
                    },
                    (err, token) => {
                        res.status(200).send({
                            success: true,
                            token: "Bearer " + token,
                            teacher: user.teacher
                        });
                    }
                );
            } else {
                console.log('Incorrect value');
                return res.status(400).send({error: 'Incorrect OTP entered'});
            }
        } else {
            console.log('Key not found in Redis.');
            return res.status(404).send({error: 'OTP Expired'});
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({error: `Error: ${error}`});
    }
};

const SignIn = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).send(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({emailNotFound: 'Email not found'});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 // 1 hr in seconds
                    },
                    (err, token) => {
                        res.status(200).send({
                            success: true,
                            token: "Bearer " + token,
                            teacher: user.teacher
                        });
                    }
                );
            } else {
                return res.status(400).send({passwordIncorrect: 'Password incorrect'});
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send(`Error: ${error}`);
    }
};

const Register = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).send(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).send('Email already exists');
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                teacher: req.body.teacher
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.status(200).send(user))
                        .catch(err => {
                            console.error(err);
                            return res.status(500).send(`Error: ${err}`);
                        });
                });
            });
        }
    });
};

module.exports = { OTPSignIn, SignIn, Register };
