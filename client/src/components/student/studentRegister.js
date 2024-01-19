import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import './student.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions.js";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

function Registers({ registerUser, auth, errors }) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        roll: '',
    });

    const { name, email, password, password2, roll } = state;

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (auth.isAuthenticated) {
            navigate("/");
        }
    }, [auth.isAuthenticated, navigate]);

    useEffect(() => {
        if (errors) {
            setState(prevState => ({
                ...prevState,
                errors: errors
            }));
        }
    }, [errors]);

    const onChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2,
            roll: roll,
            teacher: false
        };
        registerUser(newUser, navigate);
    };

    return (
        <Container maxWidth="sm" id="register">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">Register below</Typography>
                    <Typography variant="body1" color="textSecondary">Already have an account? <Link to="/login">Log in</Link></Typography>
                </Grid>
                <Grid item xs={12}>
                    <form noValidate onSubmit={onSubmit}>
                        <TextField sx={{ margin: '0.5rem 0' }}
                            onChange={onChange}
                            value={name}
                            error={errors.name ? true : false}
                            helperText={errors.name}
                            id="name"
                            type="text"
                            label="Name"
                            color="secondary"
                            variant="filled"
                            fullWidth
                        />
                        <TextField sx={{ margin: '0.5rem 0', color: 'white' }}
                            onChange={onChange}
                            color="secondary"
                            variant="filled"
                            value={email}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            id="email"
                            type="email"
                            label="Email"
                            fullWidth
                        />
                        <TextField sx={{ margin: '0.5rem 0' }}
                            onChange={onChange}
                            value={roll}
                            error={errors.roll ? true : false}
                            helperText={errors.roll}
                            id="roll"
                            type="text"
                            label="Roll"
                            color="secondary"
                            variant="filled"
                            fullWidth
                        />
                        <TextField sx={{ margin: '0.5rem 0' }}
                            onChange={onChange}
                            color="secondary"
                            variant="filled"
                            value={password}
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            id="password"
                            type="password"
                            label="Password"
                            fullWidth
                        />
                        <TextField sx={{ margin: '0.5rem 0' }}
                            onChange={onChange}
                            color="secondary"
                            variant="filled"
                            value={password2}
                            error={errors.password2 ? true : false}
                            helperText={errors.password2}
                            id="password2"
                            type="password"
                            label="Confirm Password"
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            style={{ marginTop: "1rem" }}
                        >
                            Sign up
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

Registers.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(Registers);
