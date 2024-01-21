const User = require("../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateLoginInput = require("../validation/login");
const pgdb = keys.pool;
const Redis = require('ioredis');
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/register");

const idGenerator = () => {
    const min = 1000000;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const OTPSignIn = async (req, res) => {
    const redis = new Redis();
    const client = await pgdb.connect();

    if (!req.body.email) {
        return res.status(400).send('Email empty!');
    }

    const email = req.body.email;

    try {
        const user = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (user.rows.length === 0) {
            return res.status(404).send({ emailNotFound: 'Email not found' });
        }
        console.log(user.rows[0])

        const result = user.rows[0];

        const value = await redis.get(email);

        if (value) {
            console.log('Retrieved value:', value);

            if (value === req.body.otp) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    teacher: user.teacher,
                    userId: user.userId
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
                        });
                    }
                );
            } else {
                console.log('Incorrect value');
                return res.status(400).send({ error: 'Incorrect OTP entered' });
            }
        } else {
            console.log('Key not found in Redis.');
            return res.status(404).send({ error: 'OTP Expired' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({ error: `Error: ${error}` });
    }
};

const SignIn = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    const client = await pgdb.connect();

    if (!isValid) {
        return res.status(400).send(errors);
    }

    const email = req.body.email;
    const password = req.body.password;


    try {
        const user = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (user.rows.length === 0) {
            return res.status(404).send({ emailNotFound: 'Email not found' });
        }

        const result = user.rows[0];

        bcrypt.compare(password, result.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    name: result.name,
                    teacher: result.teacher,
                    userId: result.u_id
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
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).send({ passwordIncorrect: 'Password incorrect' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send(`Error: ${error}`);
    }
};

const Register = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).send(errors);
    }

    const client = await pgdb.connect();
    const userCheck = await client.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
    console.log('User check:', userCheck.rows)
    let userId = ''
    if (userCheck.rows.length !== 0) {
        return res.status(400).send({ email: 'Email already exists' });
    } else {
        while (true) {
            userId = (req.body.teacher ? ('t' + idGenerator()) : ('s' + req.body.roll))
            const userIdCheck = await client.query('SELECT * FROM users WHERE u_id = $1', [userId]);
            if (userIdCheck.rows.length !== 0) {
                continue
            }
            break
        }

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            teacher: req.body.teacher,
            userId
        };

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                try {
                    const newUserQuery = await client.query(
                        'INSERT INTO users (name, email, password, teacher, u_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                        [newUser.name, newUser.email, newUser.password, newUser.teacher, newUser.userId]
                    );

                    console.log(newUserQuery.rows[0]);
                    res.status(200).json(newUserQuery.rows[0]);

                } catch (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            });
        });
    }
};

module.exports = { OTPSignIn, SignIn, Register, idGenerator };
