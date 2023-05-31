import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing, Login, Registert, teacherDash } from './pages/index.js';
import { Rules, Quiz, Summary, Registers} from './pages/index.js';
import { Questions, Scores } from './pages/index.js';
import { Provider } from "react-redux";
import store from "./store.js";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.js";
import { setCurrentUser, logoutUser } from "./actions/authActions.js";
import PrivateRoute from './components/common/privateRoute';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/student/register' element={<Registers />} />
        <Route path='/teacher/register' element={<Registert />} /> 
        {/* <Route path='/teacher/register' element={<TeacherRegister/>} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/student/rule'    element={<PrivateRoute path="/student/rule" component={Rules} />} /> 
        <Route path='/student/quiz'    element={<PrivateRoute path="/student/quiz" component={Quiz} />} />
        <Route path='/student/summary' element={<PrivateRoute path="/student/summary" component={Summary} />} />

        <Route path='/teacher/landing' element={<PrivateRoute path="/teacher/landing" component={teacherDash} /> } />
        <Route path='/teacher/scores' element={<PrivateRoute path="/teacher/scores" component={Scores} />} /> 
        <Route path='/teacher/questions' element={<PrivateRoute path="/teacher/questions" component={Questions} />} /> 
      </Routes>
    </Provider>
  );
}

export default App;
