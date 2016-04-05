import React, { PropTypes } from 'react';

// read filter from filter
function getIndexByFilter(props) {
  const { filters, activeFilter } = props;
  let index = 0;
  if (activeFilter) {
    filters.map((f, i) => {
      console.log(f+' '+i)
      if (f.toLowerCase() == activeFilter.toLowerCase()) {
        index = i;
      }
    });
  }

  return index;
}

function getRootClassName (className) {
  if (className) {
    return "listFilter " + className;
  }
  
  return "listFilter";
}

function ListFilter(props) {
  const { filters, className, style, onFilterChange } = props;

  const activeIndex = getIndexByFilter(props);
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
  activeFilter: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onFilterChange: PropTypes.func
};

ListFilter.defaultProps = {
  className: '',
  style: {},
  activeFilter: ''
};

export default ListFilter;
