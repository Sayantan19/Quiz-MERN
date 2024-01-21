const xlsx = require('xlsx');
const fs = require('fs');
const multer = require("multer");
const PaperDetails = require('../models/PaperDetails');
const { pool } = require('../config/keys');
const idGenerator = require('./userController').idGenerator;
let questionData = {};

function removeSpacesFromName(filename) {
    return filename.replace(/\s/g, '');
}

const checkQuestionType = (question) => {
    fields = Object.keys(question);
    mcqTemplate = ['question', 'a', 'b', 'c', 'd', 'correct'];
    fillInTheBlanksTemplate = ['question', 'correct'];
    if (JSON.stringify(fields) === JSON.stringify(mcqTemplate))
        return 'mcq'
    else
        return 'fitb'
}

const SetQuestion = async (req, res) => {
    const request = req.body;
    const response = 'Received';
    const client = await pool.connect();

    request.code = (removeSpacesFromName(request.code)).toUpperCase();
    try {
        const query = 'SELECT * FROM "paper-details" WHERE code = $1 AND test_no = $2';
        const paperCheck = await client.query(query, [request.code, request.testno]);
        if ((paperCheck.rows).length !== 0) {
            console.log('Paper details found.');
        } else {
            var p_id = '';
            while (true) {
                p_id = String(idGenerator());
                try {
                    const query = 'SELECT * FROM "paper-details" WHERE p_id = $1'
                    const pidCheck = await client.query(query, [p_id]);
                    if ((pidCheck.rows).length === 0)
                        break;
                } catch (e) {
                    res.status(500).json({ error: 'Internal Server Error' })
                }
            }
            const paper = {
                p_id,
                name: request.name,
                code: request.code,
                test_no: request.testno,
                no_of_questions: request.quizquestions,
                question_time: request.questiontime,
                u_id: request.userId,
                active: true
            }
            const query = 'INSERT INTO "paper-details" (p_id, name, code, test_no, no_of_questions, question_time, u_id, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
            const insertData = client.query(query, [paper.p_id, paper.name, paper.code, paper.test_no, paper.no_of_questions, paper.question_time, paper.u_id, paper.active]);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error finding paper details' });
        return;
    }

    for (const i of request['questions']) {
        var q_id = '';
        while (true) {
            q_id = String(idGenerator());
            try {
                const query = 'SELECT * FROM question WHERE q_id = $1'
                const qidCheck = await client.query(query, [q_id]);
                if ((qidCheck.rows).length === 0)
                    break;
            } catch (e) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
        }
        const { positive_marks, negative_marks } = i
        delete i.positive_marks;
        delete i.negative_marks;
        const question = {
            q_id,
            q_type: checkQuestionType(i),
            q_content: i,
            positive_marks,
            negative_marks,
            p_code: request.code
        }
        console.log(question);
        try {
            const query = 'INSERT INTO question (q_id, q_type,q_content,positive_marks, negative_marks, p_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
            const insertData = await client.query(query, [question.q_id, question.q_type, question.q_content, question.positive_marks, question.negative_marks, question.p_code]);
            console.log('Successful');
        } catch (e) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
    }
    res.status(200).json({ message: 'Success' });
    return;
};

const GetQuestion = (req, res) => {
    const papercode = removeSpacesFromName(req.body.code);
    const testno = removeSpacesFromName(req.body.testno);
    const filePath = `../../Data/${papercode}_test_${testno}.json`;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error opening file: ${err}`);
            res.status(500).json({ error: 'Failed to open file' });
        } else {
            const fileContents = JSON.parse(data);
            res.status(200).json(fileContents);
        }
    });
};

module.exports = { SetQuestion, GetQuestion };
