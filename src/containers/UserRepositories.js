import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbList from '../components/RepoAbList';
import { needAuth } from '../helpers';
import NeedAuth from '../components/NeedAuth';
import { fetchUserRepos } from "../actions/fetchAction";
import { checkInArray } from '../helpers';

const repoFilters = ['Recent Updated', 'Most Star', 'Most Items'];
const starFilters = [];
const routes = ['/repositories', '/stars'];

class UserRepositories extends React.Component {

  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number.isRequired
      }),
      token: PropTypes.string,
      expired_at: PropTypes.number
    }).isRequired,
    location: PropTypes.object.isRequired,
    selfReposStatus: PropTypes.string,
    selfStarsStatus: PropTypes.string,
    cache: PropTypes.object,
    status: PropTypes.string
  };

  onFilterChange = (index, filter) => {
    console.log('filter change');
  };

  currentPageLoading(props = this.props) {
    const { location, selfStarsStatus, selfReposStatus } = props;
    
    const isStar = checkStar(location.pathname);
    // console.log('selfReposStatus', selfReposStatus)
    const loadingStatus = isStar ? selfStarsStatus : selfReposStatus;
    // console.log('loadingStatus', loadingStatus)
    return loadingStatus == 'loading';
  }

  loadData(props = this.props) {
    const { auth, dispatch, location, cache } = props;

    if (!needAuth(auth.token, auth.expired_at) && !cache && !this.currentPageLoading(props)) {
      if (checkStar(location.pathname)) {
        // todo: fetch /stars
      } else {
        const i = checkInArray(location.query.filter, repoFilters);
        dispatch(fetchUserRepos(auth.user.id, repoFilters[i], 0, auth.token));
      }
    }
  }

  componentDidMount() {
    // console.log('componentDidMount')
    // this.loadData(this.props);
  }

  componentWillReceiveProps(newProps) {
    // console.log('componentWillReceiveProps')
    this.loadData(newProps);
  }

  renderContent() {
    const { cache, location, dispatch } = this.props;
    const isStar = checkStar(location.pathname);
    const filters = isStar ? starFilters : repoFilters;

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
  
  render() {
    const { auth, dispatch } = this.props;

    return (
      <div>
        {needAuth(auth.token, auth.expired_at) ?
          <NeedAuth 
            dispatch={dispatch}
          />
          :
          this.renderContent()
        }
      </div>
    );
  }
}

/**
 * if pathname is /stars
 * @returns {boolean}
 */
function checkStar(pathname) {
  return pathname.toLowerCase() == routes[1];
}

function select(state, ownProps) {
  let newState = {
    auth: state.view.auth,
    location: ownProps.location,
    selfReposStatus: state.view.componentStatus.selfRepos,
    selfStarsStatus: state.view.componentStatus.selfStars
  };

  if (checkStar(ownProps.location.pathname)) {
    newState.cache = state.cache[`/user/${newState.auth.user.id}/stars`];
  } else {
    const filterIndex = checkInArray(ownProps.location.query.filter, repoFilters);
    const filter = repoFilters[filterIndex].toLowerCase();

    newState.cache = state.cache[`/user/${newState.auth.user.id}/repositories?filter=${filter}`]
  }
  
  // console.log('newState', newState)

  return newState;
}

export default connect(select)(UserRepositories);
