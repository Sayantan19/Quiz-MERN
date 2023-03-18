import React, { useState } from 'react'
import './Questionnaire.css'
import Questionnaire from './Questionnaire.js'
import axios from 'axios';


export default function Questions() {
    const [state, setState] = useState({
        questiontime: 0,
        quizquestions: 0
    });

    const handleChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
        console.log(state);
    }

    function submitData(data) {
        axios.post('/api/questions/question', data)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(res => { console.log("Error: ", res) })
    }

    const onSubmit = e => {
        e.preventDefault();
        const data = {
            questiontime: state.questiontime,
            quizquestions: state.quizquestions
        }
        submitData(data);
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
                <hr />
                <button className="btn btn-outline-dark forms" id="nextbut" onClick={onSubmit}>Next</button>
            </div>
        </>
    )
}
