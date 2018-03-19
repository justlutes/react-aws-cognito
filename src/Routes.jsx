import React from 'react';
import PropTypes from 'proptypes';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Forgot from './components/pages/Forgot';
import Private from './components/pages/Private';

const PrivateRoute = ({ component: Component, authStatus, ...rest }) => (
  <Route
    {...rest}
    render={props => (authStatus === false ? <Redirect to="/login" /> : <Component {...props} />)}
  />
);

const Routes = ({ authStatus }) => (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Home} />
      <Route path="/forgot" component={Forgot} />
      <PrivateRoute path="/dashboard" component={Private} authStatus={authStatus} />
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  </Router>
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authStatus: PropTypes.bool.isRequired,
};

Routes.propTypes = {
  authStatus: PropTypes.bool.isRequired,
};

export default Routes;
