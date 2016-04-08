import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import RepoAbstract from './../components/RepositoryAbstract';
import ListFilter from '../components/ListFilter';
import NoResult from './NoResult';
import ContentMask from './ContentMask';

function testData(repositories) {
  let arr = [];
  for (var i = 0; i < 50; i++) {
    arr.push(
      <RepoAbstract
        className="item"
        repoId={-1}
        repositories={repositories}
      />
    );
  }

  return arr;
}

function RepoAbList(props) {

  const { filters, repositories, pathname, query, onFilterChange, loading, repos, dispatch } = props;

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
        repos.map(repoId =>
          <RepoAbstract
            key={repoId}
            className="item"
            repoId={repoId}
            repositories={repositories}
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
  repositories: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  repos: PropTypes.arrayOf(PropTypes.number),
  onFilterChange: PropTypes.func
};

RepoAbList.defaultProps = {
  filters: [],
  repos: [],
  loading: false
};

export default RepoAbList;
