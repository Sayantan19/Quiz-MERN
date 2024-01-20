import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { accessCurrentUser, logoutUser } from "../../actions/authActions";
import { Container, Grid, Button, Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const TeacherDash = ({ auth, logoutUser }) => {
  const { user } = auth;
  console.log(accessCurrentUser().decoded)
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.href = '/';
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
      <Container maxWidth="sm" style={{ height: '60vh', border: "2px solid #ab47bc", borderRadius: "10px" }} className="my-3" id="teacherDash">
        <Typography variant="h4" className="text-center ">
          Welcome to Comprehensive Assessment System, {user.name}!
        </Typography>
        <br />
        <Grid container spacing={2} className="mt-2">
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to="/teacher/questions"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Create a new exam
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to="/teacher/papers"
              variant="outlined"
              color="secondary"
              fullWidth
            >
              Your papers
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} className="my-2">
          <Grid item xs={12} sm={12}>
            <Button
              onClick={onLogoutClick}
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

TeacherDash.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TeacherDash);
