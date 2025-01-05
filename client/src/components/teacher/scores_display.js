//This component displays the scores in a tabular form
import axios from 'axios';
import exportFromJSON from 'export-from-json';
import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import './teacher.css'
import { useParams } from 'react-router-dom';

export default function Scores() {
    const [content, setContent] = useState(null);
    const { userId, code, testno } = useParams();
    const [showDialog, setShowDialog] = useState(false);
    const [deleteResultsResponseContents, setdeleteResultsResponseContents] = useState({
        title: '',
        body: '',
    })
    async function getScores() {
        axios.get(`/results/scores/${userId}/${code}/${testno}`)
            .then((res) => {
                setContent(res.data);
            })
            .catch((error) => {
                console.log('Error:', error.message);
            })
    }
    useEffect(() => {
        return () => {
            getScores()
        };
    }, []);

    function handleOnClick() {
        window.history.back();
    }

    // this function downloads the scores from a database to an excel file
    async function downloadF() {
        const data = content
        const fileName = 'Results_' + code + '_' + testno;
        const exportType = exportFromJSON.types.xls
        exportFromJSON({ data, fileName, exportType })
    };

    const onDelete = async () => {
        const data = { teacherUserId: userId, code, testno }
        await axios.post('/results/delete/deletePaperResults', data)
            .then((res) => {
                setShowDialog(true);
                setdeleteResultsResponseContents({
                    title: res.response.data.title,
                    body: res.response.data.body
                })
            })
            .catch(e => {
                setShowDialog(true);
                console.log(e)
                setdeleteResultsResponseContents({
                    title: e.response.data.title,
                    body: e.response.data.body
                })
            })
    }

    const handleCloseDialog = () => {
        setShowDialog(false);
        window.location.reload();
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                <Container id="score-table">
                    <TableContainer>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="h5">#</Typography></TableCell>
                                    <TableCell><Typography variant="h5">Student Name</Typography></TableCell>
                                    <TableCell><Typography variant="h5">Paper Name</Typography></TableCell>
                                    <TableCell><Typography variant="h5">Paper Code</Typography></TableCell>
                                    <TableCell><Typography textAlign={'center'} variant="h5">Test no.</Typography></TableCell>
                                    <TableCell><Typography textAlign={'center'} variant="h5">Student Score</Typography></TableCell>
                                    <TableCell><Typography textAlign={'center'} variant="h5">Total Marks</Typography></TableCell>
                                    <TableCell><Typography textAlign={'center'} variant="h5">Times Cheated</Typography></TableCell>
                                    <TableCell><Typography textAlign={'center'} variant="h5">Time Taken for Completion</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {content && content.length > 0 ? (
                                    content.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Typography textAlign={'left'} variant="body1">{index + 1}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'left'} variant="body1">{item.name}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'left'} variant="body1">{item.papername}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'left'} variant="body1">{item.papercode}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'center'} variant="body1">{item.testno}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'center'} variant="body1">{item.score}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'center'} variant="body1">{item.totalmarks}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'center'} variant="body1">{item.cheated}</Typography></TableCell>
                                            <TableCell><Typography textAlign={'center'} variant="body1">{item.time}</Typography></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={12} align="center">
                                            <Typography variant="h4">No content available</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Container className="my-3">
                        <Button variant="contained" color="secondary" onClick={downloadF}>
                            Save Scores
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onDelete} className="mx-3">
                            Delete Scores
                        </Button>
                        <Button variant="text" color="secondary" onClick={handleOnClick}>
                            Back
                        </Button>
                    </Container>
                </Container>
            </div>
            {
                showDialog && (
                    <Dialog
                        sx={{
                            color: 'secondary'
                        }}
                        open={showDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {deleteResultsResponseContents.title}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {deleteResultsResponseContents.body}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={handleCloseDialog} autoFocus>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
        </>
    );
}
