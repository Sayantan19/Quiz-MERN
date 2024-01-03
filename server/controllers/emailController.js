const nodemailer = require('nodemailer');
const { EMAIL_APP_PASSWORD } = require('../config/keys');
const bcrypt = require("bcryptjs");
const Redis = require('ioredis');
const User = require('../models/User')


// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email service provider
    secure: true, // Use secure connection (SSL or TLS)
    auth: {
        user: 'noreply.assessmentportal@gmail.com', // Your email address
        pass: EMAIL_APP_PASSWORD, // Retrieve app password from environment variables
        type: 'login', // Use 'login' as the authentication method
    },
});

const generateOTP = (length) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
    }

    return otp;
}

// Function to send emails
const sendOTPEmail = (req, res) => {
    const redis = new Redis();
    const email = req.body.to;
    User.findOne({ email: email }).then((user) => {
        if (user) {
            const otp = generateOTP(6);
            // Store OTP in Redis with a TTL of 10 minutes
            redis.set(email, otp, 'EX', 600);

            const mailOptions = {
                from: 'noreply.assessmentportal@gmail.com',
                to: req.body.to,
                subject: `OTP for assessment`,
                html: `
            Dear student,
            <br />
            <p>
            Your OTP for the assessment is: <b>${otp}</b>.<br />
            The OTP will expire in <b>10 minutes</b>.<br />
            Please do not share it with anyone.
            </p>
            Regards,<br />
            Assessment Portal Team
            `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).send({
                        status: 500,
                        message: `Error sending email: ${error}`
                    })
                } else {
                    console.log('Email sent:', info.response);
                    res.status(200).send({
                        status: 200,
                        message: 'Successfully sent email'
                    })
                }
            });
        } else {
            res.status(404).send({
                status: 404,
                message: `Email not found!`
            })
        }
    }).catch((e) => {
        res.status(500).send({
            status: 500,
            message: e
        })
    })
};

module.exports = { sendOTPEmail };
