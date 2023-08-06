//This contains all the relevant functions for uploading questions, and relevant settings based on it
const xlsx = require('xlsx');
const fs = require('fs');
const multer = require("multer");
const PaperDetails = require('../models/PaperDetails');
let questionData = {}

//This function handles the settings of the questions in the quiz.
//For now I have included 3 things: 
//1. The number of questions
//2. The time for each question
//3. Marking scheme

function removeSpacesFromFilename(filename) {
    // Use a regular expression to match all spaces (global flag 'g')
    return filename.replace(/\s/g, '');
}

const SetQuestion = (req, res) => {
    if (res) {
        const request = req.body;
        const response = 'Received';
        const filename = '../../Data/' + removeSpacesFromFilename(request.papercode) + '_test_' + removeSpacesFromFilename(request.testno) + '.json';
        const folderName = '../../Data'
        //Creates a folder if it doesn't exist previously.
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.error(err);
        }
        // Check if file exists
        if (fs.existsSync(filename)) {
            // Check file size
            const stats = fs.statSync(filename);
            if (stats.size === 0) {
                // Write an empty JSON object to the file
                fs.writeFileSync(filename, '{}');
            }
        } else {
            // Create the file and write an empty JSON object to it
            fs.writeFileSync(filename, '{}');
        }

        fs.readFile(filename, 'utf8', async (err, data) => {
            if (err) throw err;
            const fileData = JSON.parse(data);
            if (fileData.Question_settings === undefined) {
                const data = { "Question_settings": request, "quizData": questionData }
                Object.assign(fileData, data);
            }
            else {
                fileData['Question_settings'] = request;
                if (!Array.isArray(fileData.quizData)) {
                    fileData.quizData = []; // Initialize quizData as an empty array if it's not already
                }
                if (!Array.isArray(questionData)) {
                    questionData = [questionData]; // Convert to an array with a single element
                }
                fileData['quizData'].push(...questionData); // Use spread operator to add individual questions
            }
            await PaperDetails.findOne({ code: request.papercode, testno: request.testno })
                .then((data) => {
                    if (data) {
                        console.log('Good');
                    } else {
                        console.log(request)
                        const newPaperDetail = new PaperDetails({
                            name: request.papername,
                            code: request.papercode,
                            testno: request.testno
                        })
                        newPaperDetail.save()
                            .then(result => {
                                console.log('Paper details saved successfully');
                            })
                            .catch(err => {
                                console.log('Error:', err);
                            });
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                    res.status(500).send('Error finding paper details');
                });

            fs.writeFile(filename, JSON.stringify(fileData, null, 4), (err) => {
                if (err) throw err;
            });
        });
        res.send(response);
    }
    else
        console.log(req.status);
}

// Multer configuration for file upload
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

//Takes the uploaded file from the frontend and converts it to JSON format
const UploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(400).send('Error uploading file.');
        } else {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }

            const fileData = req.file.buffer; // Access the file buffer directly

            questionData = {}

            // Now you can use the fileData to convert it to JSON or perform other actions
            // For example, to convert the Excel data to JSON:
            const workbook = xlsx.read(fileData, { type: 'buffer' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);
            // Send the JSON data as the response
            questionData = jsonData;
            console.log(questionData[0])
            res.json(jsonData);
        }
    });
};


const GetQuestion = (req, res) => {
    const { papercode, testno } = req.body;
    const filePath = `../../Data/${papercode}_test_${testno}.json`; // Assuming file extension is ".json"

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error opening file: ${err}`);
            res.status(500).json({ error: 'Failed to open file' });
        } else {
            const fileContents = JSON.parse(data);
            res.json(fileContents);
        }
    });
}

module.exports = { SetQuestion, UploadFile, GetQuestion }