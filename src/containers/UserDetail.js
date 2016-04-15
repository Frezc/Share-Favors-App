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
import ContentMask from '../components/ContentMask';
import { Link } from 'react-router';

class UserDetail extends React.Component {

  static propTypes = {
    cache: PropTypes.object,
    userId: PropTypes.string,
    status: PropTypes.string
  };

  // server fetch
  static fetchData = (params) => {
    return fetchUserNetwork(params.id)
  };
  
  checkLoading() {
    const { status } = this.props;
    
    return status == 'loading';
  }

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
    if (!cache && !this.checkLoading()) {
      console.log(props);
      const { dispatch, userId } = props;
      dispatch(fetchUserNetwork(userId));
    }
  }


  render() {
    const { cache, isSelf, status } = this.props;

    const user = cache ? cache : defaultUser;
    // console.log(user)
    
    let links;
    if(isSelf) {
      links = [`/repositories`, `/stars`];
    } else {
      links = [`/user/${user.id}/repositories`, `/user/${user.id}/stars`];
    }

    return (
      <div className="userDetail">
        <ContentMask
          loading={status == 'loading'}
          error=""
        />

        <Avatar
          src={generateAvatarUrl(user.email, 160)}
          size={160}
          className="avatar"
        />
        <div className="nickname">{user.nickname}</div>
        <div className="email">{user.email}</div>
        <div className="sign">{user.sign || 'There is no description.'}</div>
        <Divider style={{ width: '100%' }} />
        <Subheader>[Repositories] (<Link to={links[0]}>view all</Link>)</Subheader>
        <div className="repoList">
          {user.repositories.slice(0, 3).map(repoWithRecent =>
            <RepositoryAbstract
              key={repoWithRecent.repository.id}
              style={{ marginTop: '8px' }}
              repository={repoWithRecent.repository}
              recentItems={repoWithRecent.recentItems}
            />
          )}
        </div>
        <Divider style={{ width: '100%' }}/>
        <Subheader>[Star Repositories] (<Link to={links[1]}>view all</Link>)</Subheader>
        <div className="repoList">
          {user.starlist.slice(0, 3).map(repoWithRecent =>
            <RepositoryAbstract
              key={'star' + repoWithRecent.repository.id}
              style={{ marginTop: '8px' }}
              repository={repoWithRecent.repository}
              recentItems={repoWithRecent.recentItems}
            />
          )}
        </div>
      </div>
    );
  }
}

function select(state, ownProps) {
  return {
    cache: state.cache[ownProps.location.pathname],
    isSelf: state.view.auth.user.id == ownProps.params.id,
    userId: ownProps.params.id,
    status: state.view.componentStatus.userDetail
  }
}

export default connect(select)(UserDetail);
