import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbList from '../components/RepoAbList';

const filters = ['Similarity', 'Most Star', 'Newest', 'Oldest', 'Most Items'];

class SearchRepoResult extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    cache: PropTypes.object
  };

  onFilterChange = (index, filter) => {
    const { dispatch, query } = this.props;
    
    // fetch
    // filter need be encode
    // encodeURI(filter.toLowerCase())
  };

  render() {
    const { location, dispatch, cache } = this.props;

    return (
      <RepoAbList
        filters={filters}
        location={location}
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
    location: ownProps.location
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
