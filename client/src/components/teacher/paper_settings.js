import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { accessCurrentUser } from '../../actions/authActions';
import { Button, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const drawerWidth = 240;

export default function PaperSettings() {
    const [content, setContent] = useState(null);
    const { userId } = accessCurrentUser().decoded;
    async function getPaper() {
        axios.get('/paper-details/get-details-teacher/' + userId)
            .then((res) => {
                setContent(res.data.response);
            })
            .catch(() => {
                console.log('Error');
            })
    }
    useEffect(() => {
        return () => {
            getPaper()
        };
    }, []);

    const onMod = async (paperCode, testno) => {
        const data = { paperCode, testno }
        axios.post('/paper-details/change-paper-status', data)
            .then((res) => {
                alert('Status updated successfully');
                window.location.reload();
            })
            .catch((e) => {
                console.log('Error: ', e)
            })
    }

    return (<Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
    >
        <Typography paragraph>
            <Link sx={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'flex-end', textDecoration: 'none'}} href="/teacher/questions">
                <Button variant='contained' color='secondary'>Add a new paper</Button>
            </Link>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="h5">#</Typography></TableCell>
                        <TableCell><Typography variant="h5">Paper Name</Typography></TableCell>
                        <TableCell><Typography variant="h5">Paper Code</Typography></TableCell>
                        <TableCell><Typography textAlign={'center'} variant="h5">Test no.</Typography></TableCell>
                        <TableCell><Typography textAlign={'center'} variant="h5">Status</Typography></TableCell>
                        <TableCell><Typography textAlign={'center'} variant="h5">Actions</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content && content.length > 0 ? (
                        content.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell><Typography textAlign={'left'} variant="body1">{index + 1}</Typography></TableCell>
                                <TableCell><Typography textAlign={'left'} variant="body1">{item.name}</Typography></TableCell>
                                <TableCell><Typography textAlign={'left'} variant="body1">{item.code}</Typography></TableCell>
                                <TableCell><Typography textAlign={'center'} variant="body1">{item.testno}</Typography></TableCell>
                                <TableCell><Typography textAlign={'center'} variant="body1">{item.active ? 'Active' : 'Inactive'}</Typography></TableCell>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Button onClick={() => onMod(item.code, item.testno)} variant='contained' color='secondary' sx={{'width': '125px'}}>{item.active ? 'Deactivate' : 'Activate'}</Button>
                                    <Button href={`/teacher/scores/${item.code}/${item.testno}`} variant='contained' color='secondary' sx={{'width': '125px'}}>View scores</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} align="center">
                                <Typography variant="h4">No content available</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Typography>
    </Box>
    );
}
