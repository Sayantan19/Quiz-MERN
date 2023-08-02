//This is the Registration component
import React, { Component } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import './student.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions.js";
import classnames from "classnames";
import { TextField, Button, Typography, Container, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        console.log(props)
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class Registers extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        console.log("Authenticated? ", this.props.auth.isAuthenticated)
        console.log("History: ", this.props.router.navigate)
        if (this.props.auth.isAuthenticated) {
            this.props.router.navigate("/");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            teacher: false
        };
        console.log(this.props)
        console.log("History recorded: ", this.props.router.navigate)
        this.props.registerUser(newUser, this.props.router.navigate);
        console.log(newUser);
        console.log(typeof (newUser));
    };

    render() {
        const { errors } = this.state;
        return (
            <Container maxWidth="sm" id="register">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h4">Register below</Typography>
                        <Typography variant="body1" color="textSecondary">Already have an account? <Link to="/login">Log in</Link></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form noValidate onSubmit={this.onSubmit}>
                            <TextField sx={{margin:'0.5rem 0'}}
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name ? true : false}
                                helperText={errors.name}
                                id="name"
                                type="text"
                                label="Name"
                                color="secondary"
                                variant="filled"
                                fullWidth
                            />
                            <TextField sx={{margin:'0.5rem 0'}}
                                onChange={this.onChange}
                                color="secondary"
                                variant="filled"
                                value={this.state.email}
                                error={errors.email ? true : false}
                                helperText={errors.email}
                                id="email"
                                type="email"
                                label="Email"
                                fullWidth
                            />
                            <TextField sx={{margin:'0.5rem 0'}}
                                onChange={this.onChange}
                                color="secondary"
                                variant="filled"
                                value={this.state.password}
                                error={errors.password ? true : false}
                                helperText={errors.password}
                                id="password"
                                type="password"
                                label="Password"
                                fullWidth
                            />
                            <TextField sx={{margin:'0.5rem 0'}}
                                onChange={this.onChange}
                                color="secondary"
                                variant="filled"
                                value={this.state.password2}
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
)(withRouter(Registers));