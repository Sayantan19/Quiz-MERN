//This is the component which sets the questions for the quiz.
import React, { useState } from 'react'
import { MuiFileInput } from 'mui-file-input'
import './teacher.css'
import axios from 'axios';
import { Box, Button, Container, Divider, Alert, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel } from '@mui/material';
import { accessCurrentUser } from '../../actions/authActions';


export default function Questions() {
    const [state, setState] = useState({
        questiontime: 0,
        quizquestions: 0,
        papername: '',
        papercode: '',
        testno: ''
    });

    const userDetails = accessCurrentUser();

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event);
    };

    const handleChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    function handleOnClick() {
        window.location.href = '/teacher/landing'
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

    const validateForm = () => {
        const errors = {};
        if (!state.papername) {
            errors.papername = 'Paper name is required';
        }
        if (!state.papercode) {
            errors.papercode = 'Paper code is required';
        }
        if (!state.questiontime) {
            errors.questiontime = 'Question time is required';
        }
        if (!state.quizquestions) {
            errors.quizquestions = 'Quiz questions is required';
        }
        if (!state.testno) {
            errors.quizquestions = 'Test number is required';
        }
        if (!file) {
            errors.file = 'File Upload is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSubmit = e => {
        e.preventDefault();

        // Validate the form
        if (!validateForm()) {
            setShowErrorModal(true);
            return;
        }

        const data = {
            papercode: state.papercode,
            papername: state.papername,
            testno: state.testno,
            questiontime: state.questiontime,
            quizquestions: state.quizquestions,
            userId: userDetails.userId
        }
        axios.post('/questions/question', data)
            .then(function (response) {
                console.log('Success')
            })
            .catch(res => { console.log("Error: ", res) })

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('/questions/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Make sure to set the content type
                }
            })
                .then(response => {
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
            <div style={{ minHeight: '100vh', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container style={{ border: '2px solid #ab47bc', borderRadius: '10px', padding: '2rem' }} id="info">
                    <Typography variant="h5" component="b">
                        Enter Paper Name:
                        <span style={{ color: 'red', fontSize: '15px' }}> &nbsp;*Required</span>
                    </Typography>
                    <TextField
                        name="papername"
                        id="papername"
                        variant="standard"
                        color='secondary'
                        fullWidth
                        onChange={handleChange}
                        placeholder="Paper Name"
                        sx={{ padding: '1rem 0' }}
                        required
                        error={!!formErrors.papername}
                        helperText={formErrors.papername}
                    />
                    <Divider />
                    <Typography variant="h5" component="b">
                        Enter Paper Code:
                        <span style={{ color: 'red', fontSize: '15px' }}> &nbsp;*Required</span>
                    </Typography>
                    <TextField
                        name="papercode"
                        id="papercode"
                        variant="standard"
                        color='secondary'
                        fullWidth
                        onChange={handleChange}
                        placeholder="Paper Code"
                        sx={{ padding: '1rem 0' }}
                        required
                        error={!!formErrors.papercode}
                        helperText={formErrors.papercode}
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
                        placeholder="Time for each question"
                        sx={{ padding: '1rem 0' }}
                        required
                        error={!!formErrors.questiontime}
                        helperText={formErrors.questiontime}
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
                        placeholder="Number of questions"
                        sx={{ padding: '1rem 0' }}
                        required
                        error={!!formErrors.quizquestions}
                        helperText={formErrors.quizquestions}
                    />
                    <Divider />
                    <Typography variant="h5" component="b">
                        Specify the test number
                        <span style={{ color: 'red', fontSize: '15px' }}>&nbsp;*Required</span>
                    </Typography>
                    <TextField
                        name="testno"
                        id="testno"
                        variant="standard"
                        color='secondary'
                        fullWidth
                        onChange={handleChange}
                        placeholder="Test no."
                        sx={{ padding: '1rem 0' }}
                        required
                        error={!!formErrors.testno}
                        helperText={formErrors.testno}
                    />
                    <label htmlFor="uploadFile" className="form-label">
                        <Typography variant="h5" component="b">
                            Upload the question file (.xlsx)
                            <span style={{ color: 'red', fontSize: '15px' }}>&nbsp;*Required</span>
                        </Typography>
                    </label>
                    <br></br>
                    <MuiFileInput
                        fullWidth
                        placeholder="Choose file"
                        value={file}
                        onChange={handleFileChange}
                        variant='standard'
                        color='secondary'
                        error={!!formErrors.file}
                        helperText={formErrors.file}
                    />
                    <Divider />
                    <Box display="flex" justifyContent="center" marginTop={'1rem'}>
                        <Button variant="contained" color="secondary" onClick={onSubmit}>
                            Set Questions
                        </Button>
                        <Button variant="text" color="secondary" className="mx-3" onClick={handleOnClick}>
                            Back to home
                        </Button>
                    </Box>
                </Container>
                <Dialog open={showSuccessModal} onClose={handleOnClose}>
                    <DialogTitle>SUCCESS!</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Successfully set the questions. Redirecting you to the dashboard</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='text' color='secondary' onClick={handleOnClose}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={showErrorModal} onClose={handleOnClose}>
                    <DialogTitle>ERROR!</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Question setting unsuccesful.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='text' color='secondary' onClick={handleOnClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}
