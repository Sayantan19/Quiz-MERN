//DB requirements
const User = require("../models/User");

//SignIn requirements
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateLoginInput = require("../validation/login");

//Register requirements
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/register");

const SignIn = async (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    await User.findOne({ email })
        .then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }
            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // User matched
                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 3600 // 1 hr in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                teacher: user.teacher
                            });
                        }
                    );
                } else {
                    return res
                        .status(400)
                        .json({ passwordincorrect: "Password incorrect" });
                }
            });
        });
}

const Register = (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                teacher: req.body.teacher
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
}

const generatePass = () => {
    const length = 6;
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,<.>?';

    const getRandomChar = (charSet) => {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        return charSet.charAt(randomIndex);
    };

    // Ensure at least one character from each character set
    const password = [
        getRandomChar(uppercaseChars),
        getRandomChar(lowercaseChars),
        getRandomChar(digitChars),
        getRandomChar(specialChars),
    ];

    // Fill the rest of the password with random characters
    for (let i = password.length; i < length; i++) {
        const charSet = uppercaseChars + lowercaseChars + digitChars + specialChars;
        password.push(getRandomChar(charSet));
    }

    // Shuffle the characters in the password array
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}

const AutoGen = (req, res) => {
    const finalList = [];

    for (const student of req.body.data) {
        const pass = generatePass();

        const payload = {
            body: {
                name: student.name,
                email: student.email,
                password: pass,
                password2: pass,
                teacher: false,
            },
        };

        // Call the Register function and use a different variable name for the response
        Register(payload)
        const details = {
            name: student.name,
            email: student.email,
            password: pass,
        };
        finalList.push(details);

    }
    console.log(finalList)
    // Once all registrations are attempted, you can send the finalList response
    return finalList;
};

module.exports = { SignIn, Register, AutoGen }