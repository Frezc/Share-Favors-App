import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbList from '../components/RepoAbList';
import { fetchUserRepos, fetchUserStars } from "../actions/fetchAction";
import { checkInArray } from '../helpers';
import { repoFilters, starFilters } from '../constants/filters';

class UserRepositories extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    userId: PropTypes.string,
    userReposStatus: PropTypes.string,
    userStarsStatus: PropTypes.string,
    cache: PropTypes.object
  };

  onFilterChange = (index, filter) => {
    console.log('filter change');
  };

  currentPageLoading(props = this.props) {
    const { location, userReposStatus, userStarsStatus } = props;

    const isStar = checkStar(location.pathname);
    // console.log('userReposStatus', userReposStatus)
    const loadingStatus = isStar ? userStarsStatus : userReposStatus;
    // console.log('loadingStatus', loadingStatus);
    return loadingStatus == 'loading';
  }

  loadInitData(props = this.props) {
    const { userId, dispatch, location, cache } = props;

    if (!cache && !this.currentPageLoading(props)) {
      if (checkStar(location.pathname)) {
        dispatch(fetchUserStars(userId, 0));
      } else {
        const i = checkInArray(location.query.filter, repoFilters);
        dispatch(fetchUserRepos(userId, repoFilters[i], 0));
      }
    }
  }

  componentDidMount() {
    // console.log('componentDidMount')
    this.loadInitData(this.props);
  }

  componentWillReceiveProps(newProps) {
    // console.log('componentWillReceiveProps');
    this.loadInitData(newProps);
  }

  render() {
    const { cache, location, dispatch } = this.props;
    const isStar = checkStar(location.pathname);
    const filters = isStar ? starFilters : repoFilters;
    // console.log('reponumall', cache.repoNumAll)
    return (
      <RepoAbList
        filters={filters}
        location={location}
        onFilterChange={this.onFilterChange}
        dispatch={dispatch}
        loading={this.currentPageLoading()}
        repoWithRecents={cache && cache.repoList}
        repoNumAll={cache && cache.repoNumAll}
      />
    );
  }
}

/**
 * check if pathname is /user/:id/stars
 * @param pathname
 */
function checkStar(pathname) {
  const re = /\S+\/stars$/i;
  return re.test(pathname);
}

function select(state, ownProps) {
  let newState = {
    location: ownProps.location,
    userId: ownProps.params.id,
    userReposStatus: state.view.componentStatus.userRepos,
    userStarsStatus: state.view.componentStatus.userStars
  };

  if (checkStar(ownProps.location.pathname)) {
    newState.cache = state.cache[`/user/${ownProps.params.id}/stars`];
  } else {
    const filterIndex = checkInArray(ownProps.location.query.filter, repoFilters);
    const filter = repoFilters[filterIndex].toLowerCase();

    newState.cache = state.cache[`/user/${ownProps.params.id}/repositories?filter=${filter}`]
  }

  return newState;
}

export default connect(select)(UserRepositories);
