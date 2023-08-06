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
                                    <TableCell><Typography variant="h5">#</Typography></TableCell>
                                    <TableCell><Typography variant="h5">Student Name</Typography></TableCell>
                                    <TableCell><Typography textAlign={'center'} variant="h5">Student Score</Typography></TableCell>
                                    <TableCell><Typography textAlign={'center'} variant="h5">Time Taken for Completion</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {content && content.length > 0 ? (
                                    content.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Typography textAlign={'left'} variant="body1">{index + 1}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'left'} variant="body1">{item.name}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'center'} variant="body1">{item.score}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'center'} variant="body1">{item.time}</Typography></TableCell>
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
                    <Button variant="contained" color="secondary" onClick={downloadF}>
                        Save Scores
                    </Button>
                    <Button variant="text" color="secondary" className="mx-3" onClick={handleOnClick}>
                        Back to home
                    </Button>
                </Container>
            </Container>
        </>
    );
}
