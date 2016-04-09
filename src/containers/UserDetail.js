import React, { PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import Subheader from 'material-ui/lib/Subheader';
import Divider from 'material-ui/lib/divider';
import RepositoryAbstract from '../components/RepositoryAbstract';
import { connect } from 'react-redux';
import { generateAvatarUrl } from '../helpers';
import { fetchUserNetwork, fetchUser } from '../actions/fetchAction';
import { isBrowser } from '../helpers';
import { defaultUser } from '../constants/defaultStates';

class UserDetail extends React.Component {

  static propTypes = {
    cache: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
  };

  // server fetch
  static fetchData = (params) => {
    return fetchUserNetwork(params.id)
  };

  componentDidMount() {
    const { cache } = this.props;
    // first fetch
    // only fetch at browser
    console.log(isBrowser())
    if (isBrowser() && !cache) {
      console.log('first')
      const { dispatch, userId } = this.props;
      dispatch(fetchUserNetwork(userId));
    }
  }

  componentWillReceiveProps(props) {
    const { cache } = props;
    if (!cache) {
      console.log(props);
      const { dispatch, userId } = props;
      dispatch(fetchUserNetwork(userId));
    }
  }


  render() {
    const { cache } = this.props;

    const user = cache ? cache : defaultUser;
    // console.log(user)
    return (
      <div className="userDetail">
        <Avatar
          src={generateAvatarUrl(user.email, 160)}
          size={160}
          className="avatar"
        />
        <div className="nickname">{user.nickname}</div>
        <div className="email">{user.email}</div>
        <div className="sign">{user.sign || 'There is no description.'}</div>
        <Divider style={{ width: '100%' }} />
        <Subheader>[Repositories] (<a href='#'>view all</a>)</Subheader>
        <div className="repoList">
          {user.repositories.map(repoWithRecent =>
            <RepositoryAbstract
              key={repoWithRecent.repository.id}
              style={{ marginTop: '8px' }}
              repoWithRecent={repoWithRecent}
              showRecentItems
            />
          )}
        </div>
        <Divider style={{ width: '100%' }}/>
        <Subheader>[Star Repositories] (<a href='#'>view all</a>)</Subheader>
        <div className="repoList">
          {user.starlist.map(repoWithRecent =>
            <RepositoryAbstract
              key={'star' + repoWithRecent.repository.id}
              style={{ marginTop: '8px' }}
              repoWithRecent={repoWithRecent}
              showRecentItems
            />
          )}
        </div>
      </div>
    );
  }
}

function select(state, ownProps) {
  return {
    pathname: ownProps.location.pathname,
    cache: state.cache[ownProps.location.pathname],
    userId: ownProps.params.id
  }
}

export default connect(select)(UserDetail);
