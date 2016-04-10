import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbList from '../components/RepoAbList';
import { needAuth } from '../helpers';
import NeedAuth from '../components/NeedAuth';

const repoFilters = ['Recent Updated', 'Most Star', 'Most Items'];
const starFilters = [];
const routes = ['/repositories', '/stars'];

class UserRepositories extends React.Component {

  onFilterChange = (index, filter) => {
    console.log('filter change');
  };

  renderContent() {
    const { cache, pathname, query, dispatch } = this.props;

    const isStar = checkStar(pathname);
    const filters = isStar ? starFilters : repoFilters;
    return (
      <RepoAbList
        filters={filters}
        pathname={pathname}
        query={query}
        onFilterChange={this.onFilterChange}
        dispatch={dispatch}
        loading={false}
        repoWithRecents={cache}
      />
    );
  }
  
  render() {
    const { auth, dispatch } = this.props;

    return (
      <div>
        {needAuth(auth.token, auth.expired_at) ?
          <NeedAuth 
            dispatch={dispatch}
          />
          :
          this.renderContent()
        }
      </div>
    );
  }
}

/**
 * if pathname is /stars
 * @returns {boolean}
 */
function checkStar(pathname) {
  return pathname.toLowerCase() == routes[1];
}

function select(state, ownProps) {
  let newState = {
    auth: state.view.auth,
    pathname: ownProps.location.pathname,
    query: ownProps.location.query
  };

  if (checkStar(newState.pathname)) {
    newState.cache = state.cache[`/user/${newState.auth.user.id}/stars`];
  } else {
    let filter = newState.query.filter;
    filter = filter ? filter : repoFilters[0];
    newState.cache = state.cache[`/user/${newState.auth.user.id}/repositories?filter=${filter}`]
  }

  return newState;
}

export default connect(select)(UserRepositories);
