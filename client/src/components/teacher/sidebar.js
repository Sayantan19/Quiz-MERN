import * as React from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Add, Edit, ExitToApp, Feed, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { accessCurrentUser, logoutUser } from '../../actions/authActions';
import { connect } from "react-redux";
import PropTypes from 'prop-types';



const drawerWidth = 240;

const Sidebar = ({ logoutUser, auth }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const routes = ['/teacher/landing', '/teacher/questions', '/teacher/papers'];
    const icons = [<Home sx={{ color: 'black' }} />, <Add sx={{ color: 'black' }} />, <Feed sx={{ color: 'black' }} />]; // Replace with your own icons

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const user = accessCurrentUser().decoded;

    const onLogoutClick = (e) => {
        e.preventDefault();
        logoutUser();
        window.location.href = '/';
    };

    const drawer = (
        <div id="drawer">
            <Toolbar sx={{ padding: "0.7em 0", flexDirection: "column", alignItems: "flex-start", justifyContent: "left", backgroundColor: 'black', color: 'white' }}>
                <Typography variant="body2" component="div">
                    Welcome,
                </Typography>
                <Typography variant="h6" component="div" >
                    {user.name}
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {['Home', 'Create a new exam', 'Your papers'].map((text, index) => (
                    <>
                        <ListItem key={text} disablePadding>
                            <ListItemButton component={Link} to={routes[index]}>
                                <ListItemIcon>{icons[index]}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        <hr style={{'margin': '0'}}/>
                    </>
                ))}
            </List>
            <List sx={{ position: 'absolute', bottom: '0' }}>
                {['Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={onLogoutClick}>
                            <ListItemIcon>
                                <ExitToApp sx={{ color: 'black' }} />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: 'white' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: 'white', color: 'black' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            {/* <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
            </Box> */}
        </Box>
    );
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar);
