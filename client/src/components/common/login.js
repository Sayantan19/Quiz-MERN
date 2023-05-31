import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { accessCurrentUser, loginUser } from "../../actions/authActions";
import classnames from "classnames";

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
            
            if(user.isTeacher === "false")
                window.location.href = "/student/rule"; // push user to dashboard when they login
            else
                window.location.href = '/teacher/landing'
        }
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('nextProps: ', nextProps)
        if (nextProps.auth.isAuthenticated) {
            const user = accessCurrentUser();
            console.log(user)
            if(user.isTeacher === "false")
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
                <section>
                    <div id="main-wrapper" className="d-flex flex-column justify-content-center align-items-stretch container" style={{ height: '100vh' }}>
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="card border-0" style={{ boxShadow: '0px 0px 15px 10px #c6c6c66e' }}>
                                    <div className="card-body p-0">
                                        <div className="row no-gutters">
                                            <div className="col-lg-6">
                                                <div className="p-5">
                                                    <div className="mb-5">
                                                        <h3 className="h4 font-weight-bold text-theme">Login</h3>
                                                    </div>
                                                    <h6 className="h5 mb-0">Welcome back!</h6>
                                                    <p className="text-muted mt-2 mb-5">Enter your email address and password to start the test.</p>
                                                    <form noValidate onSubmit={this.onSubmit}>
                                                        <div className="form-group"><input onChange={this.onChange} error={errors.email} value={this.state.email} id="email" type="email" placeholder="Email" className={classnames("cred", { invalid: errors.email || errors.emailnotfound })} />
                                                            <p className="text-danger">{errors.email}{errors.emailnotfound}</p>
                                                        </div>
                                                        <div className="form-group mb-5"><input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" placeholder="Password" className={classnames('cred', { invalid: errors.password || errors.passwordincorrect })} />
                                                            <p className="text-danger">{errors.password}{errors.passwordincorrect}</p>
                                                        </div>
                                                        <button className="btn btn-dark btn-outline-light border-dark" type="submit">Login</button>
                                                    </form>
                                                    <p className="text-muted mt-3 mb-0">Don&#39;t have an account? <a className="text-dark ml-1" href="/student/register">Register</a></p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 d-none d-lg-inline-block">
                                                <div className="account-block rounded-right">
                                                    <div className="overlay rounded-right"></div>
                                                    <div className="account-testimonial">
                                                        <p className="lead text-white">&quot;Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime.&quot;</p>
                                                        <p>Maimonides</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
