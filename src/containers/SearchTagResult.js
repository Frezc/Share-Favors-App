import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TagPool from '../components/TagPool';
import ListFilter from '../components/ListFilter';

const filters = ['Similarity', 'Most Used', 'Newest', 'Oldest'];

class SearchTagResult extends React.Component {

  onFilterChange = (index, filter) => {
    const { dispatch, pathname, query } = this.props;

    dispatch(push({
      pathname: pathname,
      query: Object.assign({}, query, {
        filter: filter.toLowerCase()
      })
    }));
  };

  getTestTags () {
    let tags = [];
    for (var i = 0; i < 64; i++) {
      tags.push({
        id: i,
        text: 'katsura',
        used: Math.floor(Math.random() * 10000)
      });
    }
    return tags;
  }
  
  render () {
    const { query } = this.props;

    return (
      <div>
        <ListFilter
          filters={filters}
          activeFilter={query.filter}
          onFilterChange={this.onFilterChange}
        />
        <TagPool
          tags={this.getTestTags()}
          onTagPress={tag => console.log(tag)}
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

export default connect(select)(SearchTagResult);
