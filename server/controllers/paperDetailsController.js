const { pool } = require('../config/keys');
const PaperDetails = require('../models/PaperDetails');

const GetActiveDetails = async (req, res) => {
    const query = 'SELECT * FROM "paper-details" WHERE active = true';
    try {
        const result = await pool.query(query);
        const response = result.rows;

        if (response.length > 0) {
            res.status(200).json({
                status: 200,
                response,
            });
        } else {
            console.log("You don't have any exams. Get a life.");
            return {
                status: 404,
                message: "You don't have any exams. Get a life.",
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 500,
            message: `Error: ${error}`,
        };
    }
};

const GetDetailsTeacher = async (req, res) => {
    try {
        const userId = req.params.userId;
        const query = 'SELECT * FROM "paper-details" WHERE u_id = $1';
        const { rows } = await pool.query(query, [userId]);

        if (rows.length > 0) {
            res.status(200).json({
                status: 200,
                response: rows,
            });
        } else {
            console.log('No exams set');
            res.status(404).json({
                status: 404,
                message: 'No exams set.',
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: 500,
            message: `Error: ${err.message || err}`,
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

const GetPaperDetails = async (req,res) => {
    try {
        const p_id = req.params.p_id;
        const query = 'SELECT * FROM "paper-details" WHERE p_id = $1';
        const { rows } = await pool.query(query, [p_id]);

        if (rows.length > 0) {
            res.status(200).json({
                response: rows[0],
            });
        } else {
            console.log('No exams set');
            res.status(404).json({
                message: 'No exams set.',
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: 500,
            message: `Error: ${err.message || err}`,
        });
    }
}

module.exports = { GetActiveDetails, GetDetailsTeacher, ChangePaperStatus, GetPaperDetails };
