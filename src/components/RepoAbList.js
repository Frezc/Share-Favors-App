import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import RepoAbstract from './../components/RepositoryAbstract';
import ListFilter from '../components/ListFilter';
import NoResult from './NoResult';
import ContentMask from './ContentMask';
import ListControlBar from '../components/ListControlBar';


class RepoAbList extends React.Component {
  
  static propTypes = {
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
  
  static defaultProps = {
    filters: [],
    repoWithRecents: {},
    loading: false,
    repoNumAll: 0
  };

  state = {
    index: 0,
    topPercent: 0,
    bottomPercent: .1
  };

  showRepoAbList() {
    const { repoWithRecents, repoNumAll } = this.props;
    return (
      <div>
        <ListControlBar
          className="listController"
          sum={6}
          percent={this.state.percent}
          topPercent={this.state.topPercent}
          bottomPercent={this.state.bottomPercent}
          currentIndex={this.state.index / 10}
          description={'This is Repos'}
          onDoneChange={percent => {
            // console.log(percent);
          }}
        />
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

  render() {

    const { filters, onFilterChange, repoWithRecents, loading, repoNumAll, dispatch } = this.props;
    const { pathname, query } = this.props.location;
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
          this.showRepoAbList()
        }

      </div>
    );
  }
}

export default RepoAbList;
