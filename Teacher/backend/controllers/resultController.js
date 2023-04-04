//This is the result controller. What this part does is to display the results of the people who attempted the exam/quiz

const Result = require('../models/Result');


const DisplayAll =  (req, res) => {
    if (res) {
        Result.find()
            .then(result => {
                console.log((result))
                const data = JSON.stringify(result)
                res.send(result)
            })
    }
    else
        res.send('Not Found')
}

module.exports = {DisplayAll}