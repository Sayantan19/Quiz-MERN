const PaperDetails = require('../models/PaperDetails');

const GetDetails = async (req, res) => {
    try {
        const response = await PaperDetails.find({'active': true});
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

const GetDetailsTeacher = async (req, res) => {
    try {
        console.log(req.params.userId)
        const response = await PaperDetails.find({ userId: req.params.userId });
        if (response.length > 0) {
            res.status(200).send({
                status: 200,
                response
            });
        } else {
            console.log("No exams set");
            res.status(404).send({
                status: 404,
                message: "No exams set."
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({
            status: 500,
            message: `Error: ${err}`
        });
    }
}

const ChangePaperStatus = (req, res) => {
    try {
        console.log(req.body);
        const dets = req.body;

        // Find the current value of the 'active' field
        PaperDetails.findOne({ code: dets.paperCode, testno: dets.testno })
            .then((paper) => {
                if (!paper) {
                    return res.status(404).send({
                        status: 404,
                        message: 'Paper not found',
                    });
                }

                // Toggle the value of the 'active' field
                const newActiveValue = !paper.active;

                // Update the document with the new value
                return PaperDetails.updateOne(
                    { code: dets.paperCode, testno: dets.testno },
                    { $set: { active: newActiveValue } }
                );
            })
            .then(() => {
                res.status(200).send({
                    status: 200,
                    message: 'Updated successfully',
                });
            })
            .catch((err) => {
                res.status(500).send({
                    status: 500,
                    message: `Error: ${err}`,
                });
            });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({
            status: 500,
            message: `Error: ${err}`,
        });
    }
};


module.exports = { GetDetails, GetDetailsTeacher, ChangePaperStatus };
