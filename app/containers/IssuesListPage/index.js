/**
 *
 * IssuesListPage
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

import Pagination from 'components/Pagination';
import IconCheck from 'components/Icon/IconCheck';
import IconComment from 'components/Icon/IconComment';
import IconExclamation from 'components/Icon/IconExclamation';
import logoW70 from 'images/logo-w70.png';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class IssuesListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (this.props.list.length === 0) {
      this.props.dispatch(actions.getIssues());
    }
  }

  toggleOpened = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.toggleOpened());
  }

  toggleClosed = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.toggleClosed());
  }

  render() {
    const {
      list,
      listCount,
      itemsPerPage,
      openCount,
      closedCount,
      page,
      showOpened,
      showClosed,
    } = this.props;

    let pageCount = Math.ceil(listCount / itemsPerPage);

    if (!showOpened && !showClosed) {
      pageCount = 0;
    } else if (!showOpened) {
      pageCount = Math.ceil(closedCount / itemsPerPage);
    } else if (!showClosed) {
      pageCount = Math.ceil(openCount / itemsPerPage);
    }

    return (
      <div className="issues-container">
        <Helmet>
          <title>IssuesListPage</title>
          <meta name="description" content="Description of IssuesListPage" />
          <body className="page-issues-list" />
        </Helmet>
        <div className="issues-col issues-col--bg">
          <div>
            <h2 className="issues-slogan">Full Stack Developer Task</h2>
            <div className="issues-slogan-logo">
              <span>by</span>
              <img src={logoW70} alt="" />
            </div>
          </div>
        </div>
        <div className="issues-col">
          <div className="issues-list">
            <div className="issues-list-head">
              <a
                href="/issues-list-opened"
                className={`issues-list-head-item${showOpened ? ' active' : ''}`}
                onClick={this.toggleOpened}
              ><IconExclamation />{openCount} Open</a>
              <a
                href="/issues-list-closed"
                className={`issues-list-head-item${showClosed ? ' active' : ''}`}
                onClick={this.toggleClosed}
              ><IconCheck />{closedCount} Closed</a>
            </div>
            {_.map(list, (item) => (
              <div
                key={item.id}
                className="issues-list-item"
              >
                <div className="issues-list-item-icon">
                  <IconExclamation />
                </div>

                <div className="issues-list-item-body">
                  <Link
                    className="issues-list-item-body-title"
                    to={`/issue/${item.number}`}
                  >{item.title} {item.number}</Link>
                  <div className="issues-list-item-body-meta">
                    #{item.id} opened {item.created_at} by <a href={item.user.html_url} target="_blank">{item.user.login}</a>
                  </div>
                </div>

                <div className="issues-list-item-comments">
                  <Link to={`/issue/${item.number}`}>
                    <IconComment />
                    <span>{item.comments}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {pageCount > 0 && (
            <Pagination
              initialPage={page}
              forcePage={page}
              pageCount={pageCount}
              onPageChange={({ selected }) => this.props.dispatch(actions.changePage(selected))}
              pageRangeDisplayed={5}
            />
          )}
        </div>
      </div>
    );
  }
}

IssuesListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // loading: PropTypes.bool,
  list: PropTypes.array,
  listCount: PropTypes.number,
  openCount: PropTypes.number,
  closedCount: PropTypes.number,
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
  // error: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.string,
  // ]),
  showOpened: PropTypes.bool,
  showClosed: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  list: selectors.makeSelectIssuesList(),
  listCount: (state) => state.getIn(['issuesListPage', 'listCount']),
  openCount: (state) => state.getIn(['issuesListPage', 'openCount']),
  closedCount: (state) => state.getIn(['issuesListPage', 'closedCount']),
  page: (state) => state.getIn(['issuesListPage', 'page']),
  itemsPerPage: (state) => state.getIn(['issuesListPage', 'itemsPerPage']),
  // loading: (state) => state.getIn(['issuesListPage', 'loading']),
  // error: (state) => state.getIn(['issuesListPage', 'error']),
  showOpened: (state) => state.getIn(['issuesListPage', 'showOpened']),
  showClosed: (state) => state.getIn(['issuesListPage', 'showClosed']),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'issuesListPage', reducer });
const withSaga = injectSaga({ key: 'issuesListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IssuesListPage);
