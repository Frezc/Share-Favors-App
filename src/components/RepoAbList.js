import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import RepoAbstract from './../components/RepositoryAbstract';
import ListFilter from '../components/ListFilter';
import NoResult from './NoResult';
import ContentMask from './ContentMask';

const filters = ['Similarity', 'Most Star', 'Newest', 'Oldest', 'Most Items'];

function RepoAbList(props) {

  const { repositories, pathname, query, onFilterChange, dispatch } = props;
  return (
    <div
      className="repoAbstract"
    >
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

      <ContentMask 
        loading={false}
        error=""
      />
      <NoResult />

      <RepoAbstract
        className="item"
        repoId={-1}
        repositories={repositories}
      />
      <RepoAbstract
        className="item"
        repoId={-1}
        repositories={repositories}
      />
      <RepoAbstract
        className="item"
        repoId={-1}
        repositories={repositories}
      />
      <RepoAbstract
        className="item"
        repoId={-1}
        repositories={repositories}
      />
      <RepoAbstract
        className="item"
        repoId={-1}
        repositories={repositories}
      />
    </div>
  );
}

RepoAbList.propTypes = {
  repositories: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func
};

export default RepoAbList;
