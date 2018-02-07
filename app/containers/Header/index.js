/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import logo from 'images/logo-w115.png';
import IconLogout from 'components/Icon/IconLogout';

import { logOut } from 'containers/App/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  logOut = (e) => {
    e.preventDefault();
    this.props.dispatch(logOut());
  };
  render() {
    return (
      <div className="header">
        <div className="header-item">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header-item header-item--right">
          <a
            href="/"
            onClick={this.logOut}
          ><IconLogout /> Logout</a>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
