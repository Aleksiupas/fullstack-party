/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'containers/Header';
import LoginPage from 'containers/LoginPage/Loadable';
import IssuesListPage from 'containers/IssuesListPage/Loadable';
import IssuePage from 'containers/IssuePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default function App() {
  return [
    <Switch key="switch">
      <PrivateRoute exact path="/" component={IssuesListPage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute exact path="/issue/:number" component={IssuePage} />
      <PrivateRoute component={NotFoundPage} />
    </Switch>,
  ];
}

const PrivateRoute = connect(
  (state) => ({ isLogin: state.get('isLogin') }),
)(({ component: Component, isLogin, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isLogin ? [
        <Header key="header" />,
        <Component
          key="component"
          {...props}
        />,
      ] : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    )}
  />
));
