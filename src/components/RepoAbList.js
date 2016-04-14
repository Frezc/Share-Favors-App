import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import RepoAbstract from './../components/RepositoryAbstract';
import ListFilter from '../components/ListFilter';
import NoResult from './NoResult';
import ContentMask from './ContentMask';

function showRepoAbList(props) {
  const { repoWithRecents, repoNumAll } = props;
  return (
    <div>
      {repoNumAll > 0 ?

        // todo
        repoWithRecents[0].map(repoWithRecent =>
          <RepoAbstract
            key={repoWithRecent.repository.id}
            className="item"
            repository={repoWithRecent.repository}
            recentItems={repoWithRecent.recentItems}
            loading={false}
          />
        )
        :
        <NoResult
          msg="No Repositories"
        />
      }
    </div>

  );
}

function RepoAbList(props) {

  const { filters, onFilterChange, repoWithRecents, loading, repoNumAll, dispatch } = props;
  const { pathname, query } = props.location;
  // console.log('loading', loading)
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

      {!loading &&
        showRepoAbList(props)
      }

    </div>
  );
}

RepoAbList.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  repoWithRecents: PropTypes.object,
  repoNumAll: PropTypes.number,
  // repoWithRecents: PropTypes.arrayOf(PropTypes.shape({
  //   repository: PropTypes.shape({
  //     id: PropTypes.number.isRequired
  //   }).isRequired,
  //   recentItems: PropTypes.array
  // })),
  onFilterChange: PropTypes.func
};

RepoAbList.defaultProps = {
  filters: [],
  repoWithRecents: {},
  loading: false,
  repoNumAll: 0
};

export default RepoAbList;
