import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbList from '../components/RepoAbList';

class SearchRepoResult extends React.Component {

  static propTypes = {
    repositories: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired
  };


  onFilterChange = (index, filter) => {
    const { dispatch, query } = this.props;
    
    // fetch
    // filter need be encode
    // encodeURI(filter.toLowerCase())
  };

  render() {
    const { repositories, pathname, query, dispatch } = this.props;

    return (
      <RepoAbList
        repositories={repositories}
        pathname={pathname}
        query={query}
        onFilterChange={this.onFilterChange}
        dispatch={dispatch}
      />
    );
  }
}

function select(state, ownProps) {
  return {
    repositories: state.data.repositories,
    pathname: ownProps.location.pathname,
    query: ownProps.location.query
  }
}

export default connect(select)(SearchRepoResult);
