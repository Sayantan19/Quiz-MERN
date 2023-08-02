import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { accessCurrentUser, loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Container, Box, Grid, CardContent, Card, Typography, Link, TextField, Button } from '@mui/material'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidMount() {
        console.log(this.props)
        const user = accessCurrentUser();
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {

            if (user.isTeacher === "false")
                window.location.href = "/student/rule"; // push user to dashboard when they login
            else
                window.location.href = '/teacher/landing';
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('nextProps: ', nextProps)
        if (nextProps.auth.isAuthenticated) {
            const user = accessCurrentUser();
            console.log(user)
            if (user.isTeacher === "false")
                window.location.href = "/student/rule"; // push user to dashboard when they login
            else
                window.location.href = '/teacher/landing'
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    render() {
        const { errors } = this.state;

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
                        borderRadius:'10px'
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
                                    color: 'black',
                                    backgroundColor: 'white',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: 'center',
                                    borderRadius: '10px 0 0 10px'

                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Typography variant="h4" component="h3" mb={2}>
                                            Login
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" component="h6">
                                        Welcome back!
                                    </Typography>
                                    <Typography variant="body2" color="textdark" mt={2} mb={5}>
                                        Enter your email address and password to start the test.
                                    </Typography>
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.email}
                                            color='secondary'
                                            sx={{
                                                marginBottom: '1em',
                                                color:'black'
                                            }}
                                            id="email"
                                            type="email"
                                            label="Email"
                                            className={classnames('cred', {
                                                invalid: errors.email || errors.emailnotfound,
                                            })}
                                            error={Boolean(errors.email || errors.emailnotfound)}
                                            helperText={errors.email || errors.emailnotfound}
                                            fullWidth
                                            focused
                                            disableClearable
                                            autoComplete="off"
                                        />
                                        <TextField
                                            color='secondary'
                                            onChange={this.onChange}
                                            value={this.password}
                                            sx={{color:'black'}}
                                            id="password"
                                            type="password"
                                            label="Password"
                                            className={classnames('cred', {
                                                invalid: errors.password || errors.passwordincorrect,
                                            })}
                                            error={Boolean(errors.password || errors.passwordincorrect)}
                                            helperText={errors.password || errors.passwordincorrect}
                                            fullWidth
                                            focused
                                            disableClearable
                                            autoComplete="off"
                                        />
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            type="submit"
                                            fullWidth
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Login
                                        </Button>
                                    </form>
                                    <Typography variant="caption" color="black" mt={3} mb={0}>
                                        Don't have an account?{' '}
                                        <Link href="/student/register" className="ml-1" color={'secondary'}>
                                            Register
                                        </Link>
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid
                                sx={{
                                    width: '100%',
                                    borderRadius: '10px'

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
                                        borderRadius: '10px'
                                    }}
                                    elevation={0}
                                >
                                    <Box
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '70vh',
                                            backgroundImage: 'url(https://bootdey.com/img/Content/bg1.jpg)',
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
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                borderRadius: '10px'
                                            }}
                                        >
                                            <Typography variant="body1" color="primary" gutterBottom align='left'>
                                                "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime."
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" align='left'>
                                                Maimonides
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
