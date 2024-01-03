const PaperDetails = require('../models/PaperDetails');

const GetDetails = async (req,res) => {
    await PaperDetails.find({})
        .then((response)=>{
            if(response){
                res.json(response)
            }
            else
                console.log("You don't have any exams. get a life")
        })
        .catch(err => {
            console.log('Error:',err)
            res.send(500)
        })
}

module.exports = {GetDetails}