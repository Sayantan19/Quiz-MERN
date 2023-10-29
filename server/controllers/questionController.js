const xlsx = require('xlsx');
const fs = require('fs');
const multer = require("multer");
const PaperDetails = require('../models/PaperDetails');
let questionData = {};

function removeSpacesFromFilename(filename) {
    return filename.replace(/\s/g, '');
}

const createFolderIfNotExists = (folderName) => {
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
};

const saveQuestionDataToFile = (filename, fileData, request, res) => {
    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Failed to read file' });
        } else {
            const fileData = JSON.parse(data);
            if (fileData.Question_settings === undefined) {
                const data = { "Question_settings": request, "quizData": questionData };
                Object.assign(fileData, data);
            } else {
                fileData['Question_settings'] = request;
                if (!Array.isArray(fileData.quizData)) {
                    fileData.quizData = [];
                }
                if (!Array.isArray(questionData)) {
                    questionData = [questionData];
                }
                fileData['quizData'].push(...questionData);
            }

            try {
                await PaperDetails.findOne({ code: request.papercode, testno: request.testno })
                    .then((data) => {
                        if (data) {
                            console.log('Paper details found.');
                        } else {
                            const newPaperDetail = new PaperDetails({
                                name: request.papername,
                                code: request.papercode,
                                testno: request.testno
                            });
                            newPaperDetail.save()
                                .then(result => {
                                    console.log('Paper details saved successfully');
                                })
                                .catch(err => {
                                    console.error('Error:', err);
                                    res.status(500).json({ error: 'Error saving paper details' });
                                });
                        }
                    });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Error finding paper details' });
            }

            fs.writeFile(filename, JSON.stringify(fileData, null, 4), (err) => {
                if (err) {
                    console.error('Error:', err);
                    res.status(500).json({ error: 'Failed to write file' });
                } else {
                    res.status(200).json({ message: 'Question data saved successfully' });
                }
            });
        }
    });
};

const SetQuestion = (req, res) => {
    const request = req.body;
    const response = 'Received';
    const filename = `../../Data/${removeSpacesFromFilename(request.papercode)}_test_${removeSpacesFromFilename(request.testno)}.json`;
    const folderName = `../../Data`;

    createFolderIfNotExists(folderName);

    if (fs.existsSync(filename)) {
        const stats = fs.statSync(filename);
        if (stats.size === 0) {
            fs.writeFileSync(filename, '{}');
        }
    } else {
        fs.writeFileSync(filename, '{}');
    }

    saveQuestionDataToFile(filename, {}, request, res);
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    },
}).single('file');

const UploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            res.status(400).json({ error: 'Error uploading file' });
        } else {
            if (!req.file) {
                res.status(400).json({ error: 'No file uploaded' });
            } else {
                const fileData = req.file.buffer;

                // Convert Excel data to JSON
                const workbook = xlsx.read(fileData, { type: 'buffer' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = xlsx.utils.sheet_to_json(worksheet);

                questionData = jsonData;

                res.status(200).json({ message: 'File uploaded successfully', data: jsonData });
            }
        }
    });
};

const GetQuestion = (req, res) => {
    const papercode = removeSpacesFromFilename(req.body.code);
    const testno = removeSpacesFromFilename(req.body.testno);
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

module.exports = { SetQuestion, UploadFile, GetQuestion };
