import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Register from '../src/components/auth/Register';
import Login from '../src/components/auth/Login';
import Alert from '../src/components/alert/Alert';
import Dashboard from './components/dashboard/Dashboard';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  return ( 
  <Provider store = {store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component = {Landing} />        
        <section className = "container">
        <Alert />
          <Switch>            
            <Route exact path="/register" component = {Register} />
            <Route exact path="/login" component = {Login} />
            <Route exact path="/dev-profiles" component = {Profiles} />
            <Route exact path="/profile/:name/:id" component = {Profile} />
            <PrivateRoute exact path="/dashboard" component = {Dashboard} />
            <PrivateRoute exact path="/create-profile" component = {CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component = {EditProfile} />
            <PrivateRoute exact path="/add-experience" component = {AddExperience} />
            <PrivateRoute exact path="/add-education" component = {AddEducation} />

          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};
export default App;
