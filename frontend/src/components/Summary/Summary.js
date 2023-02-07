import React, { Component } from 'react'
import './Summary.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { accessCurrentUser, logoutUser } from "../../actions/authActions.js";

class Summary extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <div className="container" id='summary-body'>
                    <h2>Thank you for taking this test! Here is the summary:</h2>
                    <div className="container">
                        <ul>
                            <li><h4>Points Scored: 00</h4></li>
                            <li><h4>Time spent: 00</h4></li>
                        </ul>
                    </div>
                    <div className="container">
                        <a href='/' className="btn btn-outline-dark" onClick={this.onLogoutClick} role='button'>Logout</a>
                    </div>
                </div>
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
