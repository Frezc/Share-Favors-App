import React, { PropTypes } from 'react';

function ListFilter(props) {
  const { filters, activeIndex } = this.props;

  return (
    <div
      className="listFilter"
    >
      <div
        className="filterButton active"
      >Similarity</div>
      <div
        className="filterButton"
      >Most Star</div>
      <div
        className="filterButton"
      >Newest</div>
      <div
        className="filterButton"
      >Oldest</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterButton"
      >Most Items</div>
      <div
        className="filterTitle"
      >Filter</div>
    </div>
  );
}

ListFilter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired
};

export default ListFilter;
