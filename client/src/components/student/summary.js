//This displays the summary of the exam the person has taken
import React, { Component } from 'react'
import './student.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { accessCurrentUser, logoutUser } from "../../actions/authActions.js";
import axios from 'axios';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: null,
            time: null
        };
    }

    componentDidMount() {
        const token = accessCurrentUser().decoded;
        const dat = {
            'id': token.id
        }
        axios.post("/results/display", dat)
            .then(response => {
                console.log('Result: ' + response.data)
                this.setState({ score: response.data.score })
                this.setState({ time: response.data.time })

            })
            .catch(response => {
                console.log('Jhamela: ' + response.status)
            })
    }



    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { score } = this.state
        const { time } = this.state

        return (
            <>
                <Container
                    maxWidth="xl"
                    className="d-flex flex-column justify-content-center align-items-stretch"
                    sx={{
                        height: '100vh',
                        width: '75vw',
                        borderRadius: '10px'
                    }}

                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 15px 10px #743f7e',
                        height: '70vh',
                        borderRadius: '10px'
                    }}>
                        <Grid
                            spacing={2}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Grid
                                xs={6}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: 'center',
                                    borderRadius: '10px 0 0 10px'
                                }}
                            >
                                <CardContent>
                                    <div id='summary-body'>
                                        <h2>Thank you for taking this test! Here is the summary:</h2>
                                        <div className="container">
                                            <ul>
                                                <li>{<h4 id="Score">Points Scored: {score}</h4>}</li>
                                                <li>{<h4 id="Time">Time spent: {time}</h4>}</li>
                                            </ul>
                                        </div>
                                        <Button variant="outlined" color="secondary" href='/' onClick={this.onLogoutClick}>
                                            Logout
                                        </Button>
                                        {/* <Button */}
                                    </div>
                                </CardContent>
                            </Grid>
                            <Grid
                                sx={{
                                    width: '100%',
                                    borderRadius: '0px 10px 10px 0px'

                                }}
                            >
                                <Card
                                    // maxWidth={'50%'}
                                    style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 200,
                                        width: '100%',
                                        overflow: 'hidden',
                                        borderRadius: '0px 10px 10px 0px'
                                    }}
                                    elevation={0}
                                >
                                    <Box
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '70vh',
                                            background: 'linear-gradient(96deg, #a21dcf, #b773d7)',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            color: 'white',
                                            textAlign: 'left',
                                            padding: '16px',
                                            borderRadius: '0px 10px 10px 0px'
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                borderRadius: '0px 10px 10px 0px'
                                            }}
                                        >
                                            <Typography variant="body1" color="primary" gutterBottom align='left'>
                                                "You are only entitled to the action, never to its fruits."
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" align='left'>
                                                Bhagavad Gita
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container >
                {/* <div className="container" id='summary-body'>
                    <h2>Thank you for taking this test! Here is the summary:</h2>
                    <div className="container">
                        <ul>
                            <li>{<h4 id="Score">Points Scored: {score}</h4>}</li>
                            <li>{<h4 id="Time">Time spent: {time}</h4>}</li>
                        </ul>
                    </div>
                    <div className="container">
                        <a href='/' className="btn btn-outline-dark" onClick={this.onLogoutClick} role='button'>Logout</a>
                    </div>
                </div> */}
            </>
        )
    }
}
Summary.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Summary);
