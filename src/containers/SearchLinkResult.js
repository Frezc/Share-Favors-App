import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ListFilter from '../components/ListFilter';
import LinkList from '../components/LinkList';

const filters = ['Similarity', 'Newest', 'Oldest'];

class SearchLinkResult extends React.Component {

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
        <LinkList />
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

export default connect(select)(SearchLinkResult);
