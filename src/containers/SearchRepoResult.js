import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbList from '../components/RepoAbList';

const filters = ['Similarity', 'Most Star', 'Newest', 'Oldest', 'Most Items'];

class SearchRepoResult extends React.Component {

  static propTypes = {
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
    cache: PropTypes.object
  };

  onFilterChange = (index, filter) => {
    const { dispatch, query } = this.props;
    
    // fetch
    // filter need be encode
    // encodeURI(filter.toLowerCase())
  };

  render() {
    const { pathname, query, dispatch, cache } = this.props;

    return (
      <RepoAbList
        filters={filters}
        pathname={pathname}
        query={query}
        onFilterChange={this.onFilterChange}
        dispatch={dispatch}
        loading={true}
        repoWithRecents={cache.repoList}
        repoNumAll={cache.repoNumAll}
      />
    );
  }
}

function select(state, ownProps) {
  let props = {
    pathname: ownProps.location.pathname,
    query: ownProps.location.query
  };

  const keyword = props.query.keyword;
  if (keyword) {
    let filter = props.query.filter;
    filter = filter ? filter : filters[0];
    props.cache = state.cache[`/search/repo?keyword=${keyword}&filter=${filter}`]
  }

  return props;
}

export default connect(select)(SearchRepoResult);
