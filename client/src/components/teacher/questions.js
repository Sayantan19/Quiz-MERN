//This is the component which sets the questions for the quiz.
import React, { useState } from 'react'
import './teacher.css'
import axios from 'axios';
import { Box, Button, Container, Divider, Alert, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


export default function Questions() {
    const [state, setState] = useState({
        questiontime: 0,
        quizquestions: 0,
        papername: '',
        papercode: ''
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
        console.log(state);
    }

    const [uploadStatus, setUploadStatus] = useState(false);

    const handleOnClose = () => {
        if (showSuccessModal) {
            setShowSuccessModal(false)
            window.location.href = '/teacher/landing'
        }
        if (showErrorModal) {
            setShowErrorModal(false)
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        const data = {
            papercode: state.papercode,
            papername: state.papername,
            questiontime: state.questiontime,
            quizquestions: state.quizquestions
        }
        axios.post('/teacher/questions/question', data)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(res => { console.log("Error: ", res) })

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('/teacher/questions/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Make sure to set the content type
                }
            })
                .then(response => {
                    console.log(response.data);
                    setUploadStatus(true);
                    setShowSuccessModal(true); // Show the success modal
                })
                .catch(err => {
                    console.error('Error uploading Excel file:', err);
                    setShowErrorModal(true);
                });
        } else {
            console.log('No file selected.');
            setShowErrorModal(true);
        }
    }

    return (
        <>
            <div style={{ height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container style={{ border: '2px solid #ab47bc', borderRadius: '10px', padding: '2rem' }} id="info">
                    <Typography variant="h5" component="b">
                        Paper Name:
                        <span style={{ color: 'red', fontSize: '15px' }}> &nbsp;*Required</span>
                    </Typography>
                    <TextField
                        name="papername"
                        id="papername"
                        variant="standard"
                        color='secondary'
                        fullWidth
                        onChange={handleChange}
                        placeholder="Your response"
                        sx={{ padding: '1rem 0' }}
                        required
                    />
                    <Divider />
                    <Typography variant="h5" component="b">
                        Paper Code:
                        <span style={{ color: 'red', fontSize: '15px' }}> &nbsp;*Required</span>
                    </Typography>
                    <TextField
                        name="papercode"
                        id="papercode"
                        variant="standard"
                        color='secondary'
                        fullWidth
                        onChange={handleChange}
                        placeholder="Your response"
                        sx={{ padding: '1rem 0' }}
                        required
                    />
                    <Divider />
                    <Typography variant="h5" component="b">
                        Specify the time to be given for each question (in seconds)
                        <span style={{ color: 'red', fontSize: '15px' }}> &nbsp;*Required</span>
                    </Typography>
                    <TextField
                        name="questiontime"
                        id="questiontime"
                        variant="standard"
                        color='secondary'
                        fullWidth
                        onChange={handleChange}
                        placeholder="Your response"
                        sx={{ padding: '1rem 0' }}
                        required
                    />
                    <Divider />
                    <Typography variant="h5" component="b">
                        Specify the number of questions in the quiz
                        <span style={{ color: 'red', fontSize: '15px' }}>&nbsp;*Required</span>
                    </Typography>
                    <TextField
                        name="quizquestions"
                        id="quizquestions"
                        variant="standard"
                        color='secondary'
                        fullWidth
                        onChange={handleChange}
                        placeholder="Your response"
                        sx={{ padding: '1rem 0' }}
                        required
                    />
                    <label htmlFor="uploadFile" className="form-label">
                        <Typography variant="h5" component="b">
                            Upload the question file (.xlsx)
                            <span style={{ color: 'red', fontSize: '15px' }}>&nbsp;*Required</span>
                        </Typography>
                    </label>
                    <TextField
                        accept=".xlsx, .xls"
                        type="file"
                        name="uploadFile"
                        id="uploadFile"
                        fullWidth
                        variant='standard'
                        color='secondary'
                        onChange={handleFileChange}
                    />
                    <Divider />
                    <Box display="flex" justifyContent="center" marginTop={'1rem'}>
                        <Button variant="outlined" color="secondary" onClick={onSubmit}>
                            Next
                        </Button>
                    </Box>
                </Container>
            </div>
            <Dialog open={showSuccessModal} onClose={handleOnClose}>
                <DialogTitle>SUCCESS!</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Your file has been successfully uploaded.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' color='secondary' onClick={handleOnClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showErrorModal} onClose={handleOnClose}>
                <DialogTitle>ERROR!</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Your file was unsuccessful.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' color='secondary' onClick={handleOnClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
