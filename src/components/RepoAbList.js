import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import RepoAbstract from './../components/RepositoryAbstract';
import ListFilter from '../components/ListFilter';
import NoResult from './NoResult';
import ContentMask from './ContentMask';

function RepoAbList(props) {

  const { filters, pathname, query, onFilterChange, loading, repos, dispatch } = props;

  return (
    <div
      className="repoAbstract"
    >
      {filters.length > 0 &&
        <ListFilter
          filters={filters}
          activeFilter={query.filter}
          onFilterChange={(index, filter) => {
            dispatch(push({
              pathname: pathname,
              query: Object.assign({}, query, {
                filter: filter.toLowerCase()
              })
            }));
  
            onFilterChange && onFilterChange(index, filter)
          }}
        />
      }

      <ContentMask
        loading={loading}
        error=""
      />

      {repos.length > 0 ?
        repos.map(repo =>
          <RepoAbstract
            key={repo.id}
            className="item"
            repo={repo}
          />
        )
        :
        <NoResult />
      }

    </div>
  );
}

RepoAbList.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  repos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })),
  onFilterChange: PropTypes.func
};

RepoAbList.defaultProps = {
  filters: [],
  repos: [],
  loading: false
};

export default RepoAbList;
