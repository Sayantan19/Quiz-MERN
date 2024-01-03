import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { accessCurrentUser } from '../../actions/authActions';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const drawerWidth = 240;

export default function PaperSettings() {
    const [content, setContent] = useState(null);
    const { token, isTeacher, name, userId } = accessCurrentUser();
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
        sx={{ flexGrow: 1, p: 3, marginLeft: '240px' }}
    >
        <Toolbar />
        <Typography paragraph>
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
                                <TableCell><Typography textAlign={'center'} variant="body1">{item.active? 'Active': 'Inactive'}</Typography></TableCell>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button onClick={() => onMod(item.code, item.testno)} variant='contained' color='secondary'>{item.active ? 'Deactivate' : 'Activate'}</Button>
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
        <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
            eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
            neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
            tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
            sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
            tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
            tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
            eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
    </Box>
    );
}
