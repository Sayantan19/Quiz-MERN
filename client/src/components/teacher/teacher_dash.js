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
      <Container maxWidth="sm" className="w-50 my-3" id="teacherDash">
        <Typography variant="h4" className="text-center">
          Do you want to Set questions, Check Student Scores or Logout?
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button
              component={Link}
              to="/teacher/questions"
              variant="contained"
              color="primary"
              fullWidth
            >
              Set Questions
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              component={Link}
              to="/teacher/scores"
              variant="outlined"
              fullWidth
            >
              Check Scores
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              onClick={this.onLogoutClick}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Container>
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
