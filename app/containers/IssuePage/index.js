/**
 *
 * IssuePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import IconBack from 'components/Icon/IconBack';
import IconExclamation from 'components/Icon/IconExclamation';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class IssuePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(actions.getIssue(this.props.match.params.number));
  }

  componentWillUnmount() {
    this.props.dispatch(actions.clearState());
  }

  render() {
    const { issue, comments } = this.props;
    return (
      <div className="issue-container">
        <Helmet>
          <title>IssuePage</title>
          <meta name="description" content="Description of IssuePage" />
          <body className="page-issue" />
        </Helmet>

        <div className="issue-nav">
          <Link to="/"><IconBack /> Back to Issues</Link>
        </div>

        {!_.isEmpty(issue) && (
          <div className="issue-header">
            <h2 className="issue-title">{issue.title} <span>#{issue.id}</span></h2>
            <div className="issue-header-meta">
              <button className="btn">
                <IconExclamation /> OPEN
              </button>
              <a href={issue.user.html_url} target="_blank">{issue.user.login}</a>
              <span> opened this issue {issue.created_at}</span>
              <span> - {issue.comments} comments</span>
            </div>
          </div>
        )}

        {!_.isEmpty(comments) && _.map(comments, (comment) => (
          <div className="issue-body" key={comment.id}>
            <a
              className="issue-body-avatar"
              href={comment.user.html_url}
              target="_blank"
            >
              <img src={comment.user.avatar_url} alt="" />
            </a>
            <div className="issue-body-header">
              <a
                href={comment.user.html_url}
                target="_blank"
              >{comment.user.login}</a>
              <span> commented {comment.created_at}</span>
            </div>
            <div className="issue-body-content">{comment.body}</div>
          </div>
        ))}
      </div>
    );
  }
}

IssuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  // loading: PropTypes.bool,
  issue: PropTypes.object,
  comments: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  issue: selectors.makeSelectIssue(),
  comments: selectors.makeSelectComments(),
  // loading: (state) => state.getIn(['issuePage', 'loading']),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'issuePage', reducer });
const withSaga = injectSaga({ key: 'issuePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IssuePage);
