import React, { PropTypes } from 'react';

function getRootClassName (className) {
  if (className) {
    return "listFilter " + className;
  }
  
  return "listFilter";
}

function ListFilter(props) {
  const { filters, activeIndex, className, style, onFilterChange } = props;

  return (
    <div
      className={getRootClassName(className)}
      style={style}
    >
      {filters.map((filter, index) =>
        <div
          key={filter}
          className={activeIndex == index ? "filterButton active" : "filterButton" }
          onTouchTap={() => onFilterChange && onFilterChange(index, filter)}
        >
          {filter}
        </div>
      )}

      <div
        className="filterTitle"
      >Filter</div>
    </div>
  );
}

ListFilter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onFilterChange: PropTypes.func
};

ListFilter.defaultProps = {
  className: '',
  style: {}
};

export default ListFilter;
