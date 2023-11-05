//This is the frontend side of the Quiz console
import { React, useEffect } from 'react';
import './student.css';
import logic from './quiz/logic.js';
import { Box, Button, ButtonGroup, Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function Quiz() {
    const location = useLocation(); // Use the useLocation hook to access location state
    const questionData = location.state?.questionData; // Get the response data from the location state
    
    useEffect(() => {
        return () => {
            logic(questionData)
        };
    }, []);
    return (
        <>
            <Container sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80vw'
            }} >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '80vh',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 20px 15px #743f7e'

                }} >
                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%',
                        }}>
                        <Grid item xs={6}
                            sx={{
                                background: 'linear-gradient(155deg, #a21dcf, #b773d7)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                justifyContent: 'space-evenly',
                                padding: '3em',
                                minWidth: '60vw',
                                borderRadius: '10px 0 0 10px'
                            }}>
                            <div>
                                <h2 className="quiz-header"><span id="qno">QNo.</span>:<span id="question">Question Text</span></h2>
                            </div>
                            <ol className="list-group list-group-numbered">
                                <li className="d-flex mx-2 align-items-center cursor-pointer">
                                    <input type="radio" name="answer" id="a" className="form-check-input answer" />
                                    <label htmlFor="a" id="a_text" className="answertext"></label>
                                </li>
                                <li className="d-flex mx-2 align-items-center">
                                    <input type="radio" name="answer" id="b" value="" className="form-check-input answer" />
                                    <label htmlFor="b" id="b_text" className="answertext"></label>
                                </li>
                                <li className="d-flex mx-2 align-items-center">
                                    <input type="radio" name="answer" id="c" className="form-check-input answer" />
                                    <label htmlFor="c" id="c_text" className="answertext"></label>
                                </li>
                                <li className="d-flex mx-2 align-items-center">
                                    <input type="radio" name="answer" id="d" className="form-check-input answer" />
                                    <label htmlFor="d" id="d_text" className="answertext"></label>
                                </li>
                            </ol>
                        </Grid>
                        <Grid item xs={6}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                justifyContent: 'space-evenly',
                                padding: '3em',
                                minWidth: '30vw',
                                borderRadius: '10px 0 0 10px'
                            }}>
                            <div id='vidcont'>
                                <video id='video' width='280' height='210' autoPlay={true} muted style={{borderRadius: '10px'}}/>
                            </div>
                            <Grid id="time">
                                <Grid item xs={6} id="timer" name="timer">
                                    <span>Time Left:</span>
                                </Grid>
                                {/* <Grid item xs={6} id="cheat">
                                    <span>Times cheated: {cheated}</span>
                                </Grid> */}
                            </Grid>
                            <div>
                                <ButtonGroup id="buttons">
                                    <Button id="next" color='secondary'  outlined='true' className="button">Next</Button>
                                    <Button id="prev" color='secondary'  outlined='true' className="button">Prev</Button>
                                    <Button id="reset" color='secondary' outlined='true' className="button">Reset</Button>
                                </ButtonGroup>
                                <ButtonGroup id="buttons">
                                    <Button id="submit" color='secondary' className='button'>Submit</Button>
                                </ButtonGroup>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </>
    );
}