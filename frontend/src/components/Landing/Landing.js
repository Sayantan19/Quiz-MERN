import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Landing.css';
class Landing extends Component {
    render() {
        return (
            <div style={{ height: "75vh" }} className="card w-50 container bg-white my-3" id="Landing">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            Do you want to Login or Register?
                        </h4>
                        <br />
                        <div className="col s6">
                            <Link to="/register" style={{display:"flex", justifyContent:"center", alignItems:"center", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large btn-dark btn-outline-light waves-effect waves-dark hoverable accent-3">
                                Register
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link
                                to="/login"
                                style={{
                                    display:"flex", justifyContent:"center", alignItems:"center",
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large btn-outline-dark waves-effect waves-light hoverable light-text accent-3"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landing;