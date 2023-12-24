import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { accessCurrentUser, logoutUser } from "../../actions/authActions";
import { Container, Grid, Button, Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

class TeacherDash extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = '/';
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
        <Container maxWidth="sm" style={{ height: '60vh', border: "2px solid #ab47bc", borderRadius: "10px" }} className="my-3" id="teacherDash">
          <Typography variant="h4" className="text-center ">
            Do you want to Set questions, Check Student Scores or Logout?
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
                Set Questions
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
                Check Scores
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="my-2">
            <Grid item xs={12} sm={6}>
              <Button
                component={Link}
                to="/teacher/student-cred-gen"
                variant="outlined"
                color="secondary"
                fullWidth
              >
                Generate Student Credentials
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={this.onLogoutClick}
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
