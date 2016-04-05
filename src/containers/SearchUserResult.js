import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ListFilter from '../components/ListFilter';

const filters = ['Similarity', 'Most Repo', 'Oldest'];

class SearchUserResult extends React.Component {

  onFilterChange = (index, filter) => {
    const { dispatch, pathname, query } = this.props;

    dispatch(push({
      pathname: pathname,
      query: Object.assign({}, query, {
        filter: filter.toLowerCase()
      })
    }));
  };
  
  render() {
    const { query } = this.props;

    return (
      <div>
        <ListFilter
          filters={filters}
          activeFilter={query.filter}
          onFilterChange={this.onFilterChange}
        />
      </div>
    );
  }
}

function select(state, ownProps) {
  return {
    pathname: ownProps.location.pathname,
    query: ownProps.location.query
  };
}

export default connect(select)(SearchUserResult);
