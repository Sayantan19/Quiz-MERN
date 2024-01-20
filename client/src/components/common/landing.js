import React from "react";
import { Box, Button, Container, Grid, Typography } from '@mui/material'

// This is the Landing Component.
// It asks the user whether they want to login or register for the quiz
export default function Landing() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{height: '90%'}}>
                <Container sx={{
                    height: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '70vh',
                        borderRadius: '10px'
                    }} id="Landing">
                        <Grid
                            spacing={2}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                borderRadius: '10px'
                            }}>
                            <Grid xs={6}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'center',
                                    paddingLeft: '3em',
                                    borderRadius: '10px 0 0 10px'

                                }} id="landingLeft">
                                <Typography variant="h1" color={'black'}>Welcome to<br /> the quiz portal</Typography>
                            </Grid>
                            <Grid xs={6}
                                sx={{
                                    backgroundColor: "black",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    justifyContent: 'center',
                                    borderRadius: '0 10px 10px 0'
                                }}>
                                <Typography color={"white"} variant="h3">Log in or Sign Up to continue</Typography>
                                <Container
                                    sx={{
                                        margin: '20px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Button variant="outlined" color="secondary" size="large"
                                        sx={{
                                            fontSize: "large",
                                            marginRight: '19.5px',
                                        }}
                                        href='/login'>
                                        Log in
                                    </Button>
                                    <Button variant="outlined" color="secondary" size="large"
                                        sx={{
                                            fontSize: "large",
                                            marginLeft: '19.5px'
                                        }}
                                        href='/student/register'>
                                        Sign up
                                    </Button>
                                </Container>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        </>
    );
}