const User = require("../models/User");
const Result = require('../../server/models/Result');

// Sends the results of the exam that the student gave
const ResultSend = (req, res) => {
    if (req) {
        console.log(req.body)
        const id = req.body.id;
        const query = { userId: id };

        User.findOne(query)
            .then(user => {
                const name = user.name;
                const email = user.email;
                const fraudcheck = {
                    email: email,
                    papername: req.body.papername,
                    papercode: req.body.papercode,
                    testno: req.body.testno
                };

                Result.findOne(fraudcheck)
                    .then(result => {
                        if (result) {
                            console.log('Fraud Case');
                            res.status(200).send('Fraud case');
                        } else {
                            let cheatcount = 0;
                            if (req.body.cheated > 0)
                                cheatcount = req.body.cheated;

                            const newResult = new Result({
                                name: name,
                                email: email,
                                score: req.body.score,
                                time: req.body.time,
                                cheated: cheatcount,
                                totalmarks: req.body.totalmarks,
                                papername: req.body.papername,
                                papercode: req.body.papercode,
                                testno: req.body.testno
                            });

                            newResult.save()
                                .then(result => res.status(200).send(result))
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).send(err.message);
                                });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send('Error finding result');
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Error finding user');
            });
    } else {
        res.status(400).send('Bad Request');
    }
}

// Displays the final result of the student
const Display = (req, res) => {
    if (req) {
        const id = req.body.id;
        const query = { _id: id };

        User.findOne(query)
            .then(user => {
                const e = user.email;
                const query1 = { email: e };

                Result.findOne(query1)
                    .then(result => {
                        if (result) {
                            const data = JSON.stringify(result);
                            res.status(200).send(data);
                        } else {
                            res.status(404).send('Result not found');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send('Error finding result');
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Error finding user');
            });
    } else {
        res.status(400).send('Bad Request');
    }
}

// Displays results of all students
const DisplayAll = (req, res) => {
    const {code, testno} = req.params;
    if (req) {
        Result.find({'papercode': code, testno})
            .then(result => {
                const data = JSON.stringify(result);
                res.status(200).send(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Error finding results');
            });
    } else {
        res.status(400).send('Bad Request');
    }
}

module.exports = { ResultSend, Display, DisplayAll };
