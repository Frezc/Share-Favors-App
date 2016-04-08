import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbList from '../components/RepoAbList';
import { needAuth } from '../helpers';
import NeedAuth from '../components/NeedAuth';

const repoFilters = ['Recent Updated', 'Most Star', 'Most Items'];
const starFilters = [];
const routes = ['/repositories', '/stars'];

class UserRepositories extends React.Component {

  isStar() {
    const { pathname } = this.props;

    return pathname.toLowerCase() == routes[1];
  }

  onFilterChange = (index, filter) => {
    console.log('filter change');
  };

  renderContent() {
    const { data, pathname, query, dispatch } = this.props;

    const isStar = this.isStar();
    const filters = isStar ? starFilters : repoFilters;
    return (
      <RepoAbList
        filters={filters}
        repositories={data.repositories}
        pathname={pathname}
        query={query}
        onFilterChange={this.onFilterChange}
        dispatch={dispatch}
        loading={false}
        repos={[-1]}
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

function select(state, ownProps) {
  return {
    auth: state.view.auth,
    data: state.data,
    pathname: ownProps.location.pathname,
    query: ownProps.location.query
  }
}

export default connect(select)(UserRepositories);
