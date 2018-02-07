/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import logo from 'images/logo-w246.png';
import Button from 'components/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as ACTIONS from './actions';
import './style.scss';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const url = window.location.href;
    this.code = url.match(/[&\?]code=([\w\/\-]+)/);

    if (this.code) {
      setTimeout(() => {
        this.props.dispatch(ACTIONS.login(this.code[1]));
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.error) {
      setTimeout(() => {
        this.redirectToGithubLogin();
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this.props.redirectToReferrer) {
      this.props.dispatch(ACTIONS.resetRedirect());
    }
  }

  logIn = () => {
    const url = window.location.href;
    this.code = url.match(/[&\?]code=([\w\/\-]+)/);

    if (!this.code) {
      this.redirectToGithubLogin();
    } else {
      this.props.dispatch(ACTIONS.login(this.code[1]));
    }
  }

  redirectToGithubLogin = () => {
    window.open('https://github.com/login/oauth/authorize?scope=repo,user&client_id=67bc120c234be15f2aa5', '_self');
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { loading, redirectToReferrer } = this.props;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className="login-container">
        <Helmet>
          <title>LoginPage</title>
          <body className="page-login" />
        </Helmet>

        <img className="login-logo" src={logo} alt="" />

        <Button
          className="login-btn btn"
          onClick={this.logIn}
          isLoading={loading}
        >Login With GitHub</Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
  redirectToReferrer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

const mapStateToProps = createStructuredSelector({
  loading: (state) => state.getIn(['loginPage', 'loading']),
  error: (state) => state.getIn(['loginPage', 'error']),
  redirectToReferrer: (state) => state.getIn(['loginPage', 'redirectToReferrer']),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
