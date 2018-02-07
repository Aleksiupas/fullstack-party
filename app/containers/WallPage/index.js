/**
 *
 * WallPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectWallPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class WallPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>WallPage</title>
        </Helmet>
        <h1>WallPage</h1>
      </div>
    );
  }
}

WallPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  wallpage: makeSelectWallPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wallPage', reducer });
const withSaga = injectSaga({ key: 'wallPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WallPage);
