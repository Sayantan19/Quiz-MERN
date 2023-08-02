//This component displays the scores in a tabular form
import axios from 'axios';
import exportFromJSON from 'export-from-json';
import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import './teacher.css'

export default function Scores() {
    const [content, setContent] = useState(null);

    async function getScores() {
        axios.get('/results/scores')
            .then((res) => {
                console.log('content recerived')
                setContent(res.data);
            })
            .catch(() => {
                console.log('Error');
            })
    }
    useEffect(() => {
        return () => {
            getScores()
        };
    }, []);

    function handleOnClick() {
        window.location.href = '/teacher/landing'
    }

    // this function downloads the scores from a database to an excel file
    async function downloadF() {
        const data = content
        const fileName = 'Results'
        const exportType = exportFromJSON.types.xls
        exportFromJSON({ data, fileName, exportType })
    };

    return (
        <>
            <Container maxWidth="md" id="score-table">
                <div id="score">
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell>Student Score</TableCell>
                                    <TableCell>Time Taken for Completion</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {content && content.length > 0 ? (
                                    content.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.score}</TableCell>
                                            <TableCell>{item.time}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            No content available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Container maxWidth="md">
                    <Button variant="outlined" color="primary" id="save" onClick={downloadF}>
                        Save Scores
                    </Button>
                    <Button variant="outlined" color="primary" id="logout" onClick={handleOnClick}>
                        Back to home
                    </Button>
                </Container>
            </Container>
            {/* <div className="container" id="score-table">
                <div id="score">
                    <table className="table table-light table-bordered" id="score">
                        <thead id="table-heading">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Student Score</th>
                                <th scope="col">Time Taken for Completion</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                content && content.length > 0
                                    ?
                                    content.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.score}</td>
                                                <td>{item.time}</td>
                                            </tr>
                                        )
                                    })
                                    : 'No content available'
                            }
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <button type="button" className="btn btn-outline-dark" id="save" onClick={downloadF}>Save Scores</button>
                    <button type="button" className="btn btn-outline-dark" id="logout" onClick={handleOnClick}>Back to home</button>
                </div>
            </div> */}
        </>
    );
}
