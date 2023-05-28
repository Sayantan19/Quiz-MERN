import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing, Login } from './pages/index.js';
import { Rules, Quiz, Summary, Register } from './pages/index.js';
import { Questions, teacherDash, teacherRegister } from './pages/index.js';
import { Provider } from "react-redux";
import store from "./store.js";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.js";
import { setCurrentUser, logoutUser } from "./actions/authActions.js";
import PrivateRoute from './components/private-route/PrivateRoute';

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
        <Route path='/student/register' element={<Register />} />
        <Route path='/teacher/register' element={<teacherRegister />} />
        <Route path='/login' element={<Login />} />
        <Route path='/student/'    element={<PrivateRoute path="/rule" component={Rules} />} /> 
        <Route path='/student/'    element={<PrivateRoute path="/quiz" component={Quiz} />} />
        <Route path='/student/' element={<PrivateRoute path="/summary" component={Summary} />} />

        <Route path='/teacher/' element={<PrivateRoute path="/landing" component={teacherDash} /> } />
        <Route path='/teacher/' element={<PrivateRoute path="/scores" component={Scores} />} /> 
        <Route path='/teacher/' element={<PrivateRoute path="/questions" component={Questions} />} /> 
      </Routes>
    </Provider>
  );
}

export default App;
