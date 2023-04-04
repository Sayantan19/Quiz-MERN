//This contains all the relevant functions for uploading questions, and relevant settings based on it
const fs = require('fs');
const multer = require("multer");


//This function handles the settings of the questions in the quiz.
//For now I have included 2 things: 
//1. The number of questions
//2. The time for each question

const SetQuestion = (req, res) => {
    if (res) {
        const request = req.body;
        const response = 'Received';
        const filename = '../../Data/question.json';
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
        
        fs.readFile('../../Data/question.json', 'utf8', (err, data) => {
            if (err) throw err;
            const fileData = JSON.parse(data);
            if (fileData.Question_settings === undefined) {
                const data = { "Question_settings": request }
                Object.assign(fileData, data);
            }
            else
                fileData['Question_settings'] = request;
            fs.writeFile('../../Data/question.json', JSON.stringify(fileData, null, 4), (err) => {
                if (err) throw err;
            });
        });
        res.send(response);
    }
    else
        console.log(req.status);
}


//This is used to store the uploaded question.json file from the frontend in the localstorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../Data');
    },
    filename: function (req, file, cb) {
        cb(null, 'questiondata.json');
    }
});


//This helps in checking the file type, and then saving it for accessing it to edit the main question.json file
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Check file type
        if (file.mimetype === 'application/json') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    }
}).single('file');


//Confirms the file upload to the user and displays errors if any
const UploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(400).send('Error uploading file.');
        } else {
            console.log(req.file);
            res.send('File uploaded successfully.');
        }
    });
}

//This is the crucial part. This puts everything together and places the final question.json file
const UploadQuestion = (req, res)=>{
    if (res) {
        const filename = '../../Data/questiondata.json';
        
        // Check if file exists
        if (!fs.existsSync(filename)) {
          // Create the file and write an empty JSON object to it
          fs.writeFileSync(filename, '');
        }
        
        fs.readFile('../../Data/questiondata.json', 'utf8', (err, data) => {
            if (err) throw err;
            const request = JSON.parse(data);
            const response = "JSON received";
            fs.readFile('../../Data/question.json', 'utf8', (err, data) => {
                if (err) throw err;
                const fileData = JSON.parse(data);
                if (fileData.quizData === undefined) {
                    console.log("Yes");
                    Object.assign(fileData, request);
                }
                else {
                    var x = Object.values(fileData.quizData);
                    for (var i in Object.values(request['quizData'])) {
                        x.push(request['quizData'][i])
                    }
                    fileData.quizData = x;
                }
                fs.writeFile('../../Data/question.json', JSON.stringify(fileData, null, 4), (err) => {
                    if (err) throw err;
                });
            });
            res.send(response);

        })
    }
    else
        console.log(req.status);
}


module.exports = { SetQuestion, UploadFile, UploadQuestion }