import React, { useState } from 'react';
import './student.css'
import { useLocation, useNavigate } from 'react-router-dom'; // Import the useLocation hook
import { Container, List, ListItem, Typography, Box, FormControlLabel, Checkbox, Link, Button } from '@mui/material'
import { KeyboardArrowRightOutlined } from '@mui/icons-material'
import { purple } from '@mui/material/colors'


//This is the Rules component. It displays rules of the quiz which the user has to comply to
export default function Rules() {
    const [checked, setChecked] = useState(false);
    const location = useLocation(); // Use the useLocation hook to access location state
    const questionData = location.state?.questionData; // Get the response data from the location state
    const navigate = useNavigate(); // This hook allows us to navigate to a different route

    const handleSubmit = () =>{
        // Pass the response data to the Rules component when navigating to it
        navigate('/student/quiz', { state: { questionData: questionData } });
    }

    const handleChange = () => {
        if (checked === false) {
            document.getElementById('start').style.display = 'block';
        }
        else {
            document.getElementById('start').style.display = "none";
        }
        setChecked(!checked);
    };
    const purp = purple[50];    

    return (
        <>
            <Container
                sx={{
                    height: '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80vw',
                    flexDirection: 'column'
                }}
                >
                <Box
                    sx={{
                        borderRadius: '10px',
                        boxShadow: '0px 0px 20px 15px #743f7e',
                        padding: '2em',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        background: `linear-gradient(96deg, #a21dcf, #b773d7)`,
                        color: 'black'

                    }}
                >
                    <Typography variant="h3">Rules for the examination</Typography>
                    <List>
                        <ListItem><KeyboardArrowRightOutlined />This is an MCQ based quiz.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />Questions will be asked from all domains pertaining to the subject.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />{questionData.quizData[0]['positive_marks'] || '4'} points will be awarded for each correct answer.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />{questionData.quizData[0]['negative_marks'] || '-1'} point will be awarded for each incorrect answer.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />Use of unfair means will be strictly dealt with. Please note that there is a proctoring system enabled for checking whether you are using any unfair means.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />Anyone caught cheating, accessing the internet or use any other means which can damage the spirit of the event will result in immediate disqualification of that team.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />Please be careful while answering. Answers attempted won't be saved and once you proceed to the next question, you will not be allowed to go back.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined /><b>Kindly refrain from refreshing the browser</b></ListItem>
                        <ListItem><FormControlLabel
                            required
                            control={<Checkbox color='default' onChange={handleChange} />}
                            label="I have read all the rules carefully and agree to abide by them"
                        />
                        </ListItem>
                    </List>
                    <div className="container" id="submit-button">
                        <Link onClick={handleSubmit} underline='none'><Button
                            sx={{
                                borderColor: purp,
                                color: 'white',
                                backgroundColor: 'black',
                                display: 'none',
                            }} variant='contained' color='inherit' fullWidth id='start'>Start Quiz!!!</Button>
                        </Link>
                    </div>
                </Box >
            </Container>
        </>
    );
}
