import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dropdown from '../common/dropdown';
import { logoutUser } from '../../actions/authActions.js';
import { Button, Container, Typography } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ExamChoice = ({ logoutUser }) => {
    const [selectedValue, setSelectedValue] = useState({});
    const [options, setOptions] = useState([]);
    const navigate = useNavigate(); // This hook allows us to navigate to a different route

    useEffect(() => {
        // Make the API call to fetch the options
        axios.get('/paper-details/get-details')
            .then(response => setOptions(response.data.response))
            .catch(error => console.error(error));
    }, []);

    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
    };


    const handleSubmit = () => {
        navigate(`/student/rule/${selectedValue.p_id}`);
    };

    console.log(options)

    return (
        <>
            <Container className="d-flex flex-column gap-4 align-items-center justify-content-center" style={{ height: '80vh' }}>
                {options.length ? (
                    <>
                        <Typography variant="h5">Enter the test you want to attempt</Typography>
                        <Dropdown
                            options={options}
                            selectedOption={selectedValue}
                            handleChange={handleDropdownChange}
                        />
                        <Button variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button> {/* Add a submit button */}
                    </>
                ) : (
                    <>
                        <Typography variant="h5">You do not have any exams now. Please come back later.</Typography>
                        <Button variant="contained" color="secondary" onClick={logoutUser}>Logout</Button> {/* Add a submit button */}
                    </>
                )
                }
            </Container>
        </>
    );
};
ExamChoice.propTypes = {
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(ExamChoice);
