//This file handles several responses based on the different authentication actions done by the user
import axios from "axios";
import setAuthToken from "../utils/setAuthToken.js";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types.js";

// Register User
export const registerUser = (userData, navigate) => dispatch => {
    axios.post("/users/register", userData)
        .then(function (res) {
            console.log(res.status);
            alert('You have successfully registered. Redirecting you to Login page')
            navigate("/login")
        }) // re-direct to login on successful register
        .catch(function (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

// Login - get user token
export const loginUser = (userData) => dispatch => {
    axios.post("/users/login", userData)
        .then(function (res) {
            // Save to localStorage
            // Set token to localStorage
            const { token, teacher } = res.data;
            console.log(token)
            console.log(teacher)
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("isTeacher", teacher);
            
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(function (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

//This function decodes the current user's JWT and displays the email and MongoDB id
export function accessCurrentUser() {
    if (localStorage.jwtToken) {
        const decoded = jwt_decode(localStorage.jwtToken);
        const teacher = localStorage.isTeacher;
        return {"decoded": decoded, "isTeacher": teacher};
    }
    else
        return null;
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isTeacher")
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};