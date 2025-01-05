const User = require("../models/User");
const Result = require('../../server/models/Result');

// Sends the results of the exam that the student gave
const ResultSend = (req, res) => {
    if (req) {
        const id = req.body.id;
        const query = { _id: id };

        User.findOne(query)
            .then(user => {
                const name = user.name;
                const email = user.email;
                const fraudcheck = {
                    email: email,
                    papername: req.body.papername,
                    papercode: req.body.papercode,
                    teacherUserId: req.body.teacherUserId,
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
                                teacherUserId: req.body.teacherUserId,
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

// Displays results of all students for a particular exam
const DisplayAll = (req, res) => {
    const { teacherUserId, code, testno } = req.params;
    if (req) {
        Result.find({ 'papercode': code, testno, teacherUserId })
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

const DeleteAllResults = async (req, res) => {
    try {
        const { teacherUserId, code, testno } = req.body;
        console.log(req.body);
        // Validate input
        if (!teacherUserId || !code || !testno) {
            return res.status(400).send({ 
                title: "Bad Request", 
                body: "Missing required fields: teacherUserId, code, or testno" 
            });
        }

        // Attempt to delete records
        const result = await Result.deleteMany({ 
            papercode: code, 
            teacherUserId,
            testno
        });
        console.log(result.deletedCount)
        if (result.deletedCount > 0) {
            return res.status(200).send({
                title: "Operation successful",
                body: `${result.deletedCount} record(s) successfully deleted.`
            });
        }else {
            return res.status(404).send({
                title: "No Records Found",
                body: "No matching records were found to delete."
            });
        }
    } catch (error) {
        console.error("Error during deletion: ", error);
        return res.status(500).send({
            title: "Operation unsuccessful",
            body: "An unexpected error occurred."
        });
    }
};


module.exports = { ResultSend, Display, DisplayAll, DeleteAllResults };
