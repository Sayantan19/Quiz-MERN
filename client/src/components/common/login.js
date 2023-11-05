import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accessCurrentUser, loginUser, loginUserWithOTP } from '../../actions/authActions';
import classnames from 'classnames';
import {
    Container,
    Box,
    Grid,
    CardContent,
    Card,
    Typography,
    Link,
    TextField,
    Button,
    CircularProgress,
    Backdrop,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@mui/material';
import axios from 'axios';

function Login({ loginUser, auth, errors }) {
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: '',
        errors: {},
    });

    const [emailResponseContents, setEmailResponseContents] = useState({
        title: '',
        body: '',
    })

    useEffect(() => {
        const user = accessCurrentUser();
        if (auth.isAuthenticated) {
            if (user.isTeacher === 'false') {
                window.location.href = '/student/exam-choice';
            } else {
                window.location.href = '/teacher/landing';
            }
        }
    }, [auth.isAuthenticated]);

    useEffect(() => {
        if (errors) {
            setFormData({ ...formData, errors });
        }
    }, [errors]);

    const { email, password, otp } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleCloseDialog = () => {
        setShowDialog(false)
        setOtpSent(true);
        handleResetTimer();
    }

    const handleResetTimer = () => {
        let countdown = 10;
        const timer = setInterval(() => {
            setResendTimer(countdown);
            countdown -= 1;

            if (countdown < 0) {
                clearInterval(timer); // Stop the timer
                setResendTimer(0); // Reset the timer
            }
        }, 1000);
    }

    const onSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = {
            email,
            password,
        };

        const emailData = {
            to: userData.email,
        };

        await axios.post('/email/send-email', emailData)
            .then((res) => {
                setEmailResponseContents({
                    title: 'Successfully sent email',
                    body: 'Please check your email for the OTP'
                })
            })
            .catch((e) => {
                console.log(e.response.data.message)
                setEmailResponseContents({
                    title: 'Could not send email',
                    body: `${e.response.data.message}`
                })
                setOtpSent(false)
            })
        setLoading(false);
        setShowDialog(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = {
            email,
            password,
        };

        loginUser(userData);
        setLoading(false)
    };

    return (
        <>
            <Container
                maxWidth="xl"
                className="d-flex flex-column justify-content-center align-items-stretch"
                sx={{
                    height: '100vh',
                    width: '75vw',
                    borderRadius: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 15px 10px #743f7e',
                        height: '70vh',
                        borderRadius: '10px',
                    }}
                >
                    <Grid
                        xs={6}
                        sx={{
                            color: 'black',
                            backgroundColor: 'white',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'center',
                            borderRadius: '10px 0 0 10px',
                            padding: '3em'
                        }}
                    >
                        <Container>
                            <Typography textAlign={'center'} variant="h4" component="h3" mb={5}>
                                Login
                            </Typography>
                            <Typography variant="body2" color="textdark" mb={2}>
                                Please enter your email address to continue.
                            </Typography>
                            {!otpSent && (
                                <>
                                    <TextField
                                        onChange={onChange}
                                        value={email}
                                        color="secondary"
                                        sx={{
                                            marginBottom: '1em',
                                            color: 'black',
                                        }}
                                        id="email"
                                        type="email"
                                        label="Email"
                                        className={classnames('cred ', {
                                            invalid: errors.email || errors.emailNotFound,
                                        })}
                                        error={Boolean(errors.email || errors.emailNotFound)}
                                        helperText={errors.email || errors.emailNotFound}
                                        fullWidth
                                        focused
                                        autoComplete="off"
                                    />
                                    <TextField
                                            color="secondary"
                                            onChange={onChange}
                                            value={password}
                                            sx={{ color: 'black' }}
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
                                            onClick={onSubmit}
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Login
                                        </Button>
                                    {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={onSendEmail}
                                        disabled={otpSent}
                                        fullWidth
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Send OTP
                                    </Button> */}
                                    <Typography variant="caption" color="black" mt={3} mb={0}>
                                        Don't have an account?{' '}
                                        <Link href="/student/register" className="ml-1" color={'secondary'}>
                                            Register
                                        </Link>
                                    </Typography>
                                </>)}
                            {otpSent && (
                                <>
                                    <TextField
                                        onChange={onChange}
                                        value={otp}
                                        color="secondary"
                                        sx={{
                                            marginBottom: '1em',
                                            color: 'black',
                                        }}
                                        id="otp"
                                        type="otp"
                                        label="OTP"
                                        className={classnames('cred ', {
                                            invalid: errors.otp || errors.error,
                                        })}
                                        error={Boolean(errors.otp || errors.error)}
                                        helperText={errors.otp || errors.error}
                                        fullWidth
                                        focused
                                        autoComplete="off"
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        disabled={!otpSent}
                                        fullWidth
                                        onClick={onSubmit}
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Login
                                    </Button>
                                    <Typography variant="caption" color="black" mt={3} mb={0}>
                                        You can request another OTP after 10 seconds.&nbsp;
                                        <Link
                                            onClick={resendTimer === 0 ? onSendEmail : null} // Allow click only when resendTimer is 0
                                            className="ml-1"
                                            color="secondary"
                                            style={{ cursor: 'pointer', display: resendTimer === 0 ? 'inline' : 'none', fontSize: '12px' }} // Style to change cursor
                                        >
                                            Resend OTP
                                        </Link>
                                    </Typography>
                                </>)}

                        </Container>

                    </Grid>
                    <Grid
                        sx={{
                            width: '100%',
                            borderRadius: '10px',
                        }}
                    >
                        <Card
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 200,
                                width: '100%',
                                overflow: 'hidden',
                                borderRadius: '10px',
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
                                    borderRadius: '10px',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        borderRadius: '10px',
                                    }}
                                >
                                    <Typography variant="body1" color="primary" gutterBottom align="left">
                                        "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime."
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" align="left">
                                        Maimonides
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                </Box>
            </Container>
            {loading && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress
                        color='secondary'
                        sx={{
                            position: 'absolute',
                            top: '1/2',
                            right: '1/2'
                        }} />
                </Backdrop>
            )}
            {
                showDialog && (
                    <Dialog
                        sx={{
                            color: 'secondary'
                        }}
                        open={showDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {emailResponseContents.title}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {emailResponseContents.body}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={handleCloseDialog} autoFocus>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
        </>
    );
}

Login.propTypes = {
    loginUserWithOTP: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
