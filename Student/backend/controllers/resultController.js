//This is the result controller. What this part does is to display the results of the people who attempted the exam/quiz
const User = require("../models/User");
const Result = require('../models/Result');
const mongoose = require('mongoose');

//Sends the results of the exam that the student gave
const ResultSend = (req, res) => {

    if (res) {
        const id = req.body.id;
        const query = { _id: id };
        // Find user by email
        User.findOne(query)
            .then(user => {
                const name = user.name;
                const email = user.email;
                Result.findOne({ email })
                    .then(result => {
                        if (result) {
                            console.log('Fraud Case');
                            res.send('Fraud case');
                        }
                        else {
                            const newResult = new Result({
                                name: name,
                                email: email,
                                score: req.body.score,
                                time: req.body.time
                            })
                            newResult.save()
                                .then(result => res.json(result))
                                .catch(err => { console.log(err); res.send(err.message) });
                        }
                    })
            })
            .catch(response =>
                console.log(response))
    }
    else
        console.log(req.status)
}


//This Displays the final result of the student (If he has already given his exam before then it will show htheir previous result)
const Display = (req, res) => {
    if (res) {
        const id = req.body.id;
        const query = { _id: id }
        User.findOne(query)
            .then(user => {
                const e = user.email;
                const query1 = {email: e}
                Result.findOne(query1)
                    .then(result => {
                        const data = JSON.stringify(result)
                        res.send(data)
                    })
                    .catch(response =>{console.log(response)})
            })
    }
    else
        res.send('Not Found')
}

module.exports = { ResultSend, Display }