const PaperDetails = require('../models/PaperDetails');

const GetDetails = async (req, res) => {
    try {
        const response = await PaperDetails.find({});
        if (response.length > 0) {
            res.status(200).send({
                status: 200,
                response
            });
        } else {
            console.log("You don't have any exams. Get a life.");
            res.status(404).send({
                status: 404,
                message: "You don't have any exams. Get a life."
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({
            status: 500,
            message: `Error: ${err}`
        });
    }
};

module.exports = { GetDetails };
