import React, { useState } from 'react';
import './student.css'
import { Container, List, ListItem, Typography, Box, FormControlLabel, Checkbox, Link, Button } from '@mui/material'
import { KeyboardArrowRightOutlined } from '@mui/icons-material'
import { purple } from '@mui/material/colors'


//This is the Rules component. It displays rules of the quiz which the user has to comply to
export default function Rules() {
    const [checked, setChecked] = useState(false);
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
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80vw',
                    borderRadius: '10px',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
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
                        <ListItem><KeyboardArrowRightOutlined />4 points will be awarded for each correct answer.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />1 point to be deducted for each incorrect answer.</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />Ranking will be done based on the total points obtained and the time taken to finish the questions</ListItem>
                        <ListItem><KeyboardArrowRightOutlined />In case of tie break, the time taken to submit the quiz will be considered as the deciding factor.</ListItem>
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
                        <Link href='/student/quiz' underline='none'><Button
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
