import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dropdown from '../common/dropdown';
import { Button, Container, Typography } from '@mui/material';

const ExamChoice = () => {
    const [selectedValue, setSelectedValue] = useState({});
    const [options, setOptions] = useState([]);
    const navigate = useNavigate(); // This hook allows us to navigate to a different route

    useEffect(() => {
        // Make the API call to fetch the options
        axios.get('/paper-details/get-details')
            .then(response => setOptions(response.data.response))
            .catch(error => console.error(error));
    }, []);

    console.log(options)

    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = () => {
        axios.post('/questions/get-question', selectedValue)
            .then((response) => {
                // Pass the response data to the Rules component when navigating to it
                navigate('/student/rule', { state: { questionData: response.data } });
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Container className="d-flex flex-column gap-4 align-items-center justify-content-center" style={{ height: '80vh' }}>
                <div className="d-flex gap-4 align-items-center justify-content-center">
                    <Typography variant="h5">Enter the test you want to attempt</Typography>
                    <Dropdown
                        options={options}
                        selectedOption={selectedValue}
                        handleChange={handleDropdownChange}
                    />
                </div>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button> {/* Add a submit button */}
            </Container>
        </>
    );
};

export default ExamChoice;
