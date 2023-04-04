//This is the component which sets the questions for the quiz.
import React, { useEffect, useState } from 'react'
import './Questionnaire.css'
import axios from 'axios';


export default function Questions() {
    const [state, setState] = useState({
        questiontime: 0,
        quizquestions: 0
    });

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
        console.log(state);
    }

    const [uploadStatus, setUploadStatus] = useState(0);
    const onSubmit = e => {
        e.preventDefault();
        const data = {
            questiontime: state.questiontime,
            quizquestions: state.quizquestions
        }
        axios.post('/api/questions/question', data)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(res => { console.log("Error: ", res) })
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/api/questions/upload', formData)
            .then(response => {
                if (response.data === 'File uploaded successfully.') {
                    console.log('hello')
                    setUploadStatus(1);
                }
            })
            .catch(error => {
                console.log(error);
            });

        console.log(uploadStatus)

        axios.post('/api/questions/process', 'process')
            .then(response => {
                console.log(response.data)
                alert('Questions have been uploaded successfully. Redirecting you to the dashboard!')
                window.location.href = '/landing';
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <>
            <div className="container form-group" style={{ background: 'white', borderRadius: '3px', marginTop: '5em', padding: '1em' }} id='info'>
                <div className="forms">
                    <label htmlFor="questiontime" className="form-label">
                        <h3><b>Specify the time to be given for each question (in seconds)</b><span style={{ color: 'red', fontSize: '15px' }}>*Required</span></h3>
                    </label>
                    <input type="text" className="form-control" name="questiontime" id="questiontime" onChange={handleChange}
                        placeholder="" required={true} />
                </div>
                <hr />
                <div className="forms">
                    <label htmlFor="quizquestions" className="form-label">
                        <h3><b>Specify the number of questions in the quiz</b> <span style={{ color: 'red', fontSize: '15px' }}>*Required</span></h3>
                    </label>
                    <input type="text" className="form-control" id="quizquestions" name="quizquestions" onChange={handleChange}
                        placeholder="" required={true} />
                </div>
                <div className="forms">
                    <label htmlFor="uploadFile" className="form-label">
                        <h3><b>Specify the number of questions in the quiz</b> <span style={{ color: 'red', fontSize: '15px' }}>*Required</span></h3>
                    </label>
                    <input type="file" className='form-control' name='uploadFile' id='uploadFile' onChange={handleFileChange} />
                </div>
                <hr />
                <button className="btn btn-outline-dark forms" id="nextbut" onClick={onSubmit}>Next</button>
            </div>
        </>
    )
}
