import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, InputLabel, Typography } from '@mui/material';

const Dropdown = ({ options, selectedOption, handleChange }) => {
    const renderSelectedValue = (selectedOption) => {
        if (!selectedOption) {
            return <em>Select an option</em>;
        }

        return (
            <>
                <Typography variant="h5">{selectedOption.name}</Typography>
            </>
        );
    };

    return (
        <>
            <FormControl>
                <InputLabel color="secondary" id="demo-simple-select-label">Select an option</InputLabel>
                <Select
                    variant='outlined'
                    color='secondary'
                    sx={{ width: '40vw' }}
                    labelId="demo-simple-select-label"
                    label="Select an option"
                    value={selectedOption}
                    onChange={handleChange}
                    renderValue={renderSelectedValue}
                >
                    {/* Render the actual options */}
                    {options.map((option) => (
                        <MenuItem
                            key={option.code}
                            value={option}
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <span>
                                <Typography variant="h5">{option.name}</Typography>
                            </span>
                            <span style={{ fontSize: 12 }}>
                                <div className='mx-3'>Paper Code: {option.code}</div>
                                <div className='mx-3'>Test Number: {option.testno}</div>
                            </span>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default Dropdown;
