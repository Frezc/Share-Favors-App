import React, { PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import Subheader from 'material-ui/lib/Subheader';
import Divider from 'material-ui/lib/divider';
import RepositoryAbstract from '../components/RepositoryAbstract';
import { connect } from 'react-redux';
import { generateAvatarUrl } from '../helpers';
import { fetchUserNetwork, fetchUser } from '../actions/fetchAction';
import { isBrowser } from '../helpers';

class UserDetail extends React.Component {

  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      sign: PropTypes.string,
      starlist: PropTypes.array.isRequired,
      repositories: PropTypes.array.isRequired
    }).isRequired,
    repositories: PropTypes.object.isRequired
  };

  // server fetch
  static fetchData = (params) => {
    return fetchUserNetwork(params.id)
  };

  componentWillMount() {
    // console.log(isBrowser())
  }

  componentDidMount() {
    const { userId } = this.props;
    // first fetch
    // only fetch at browser
    console.log(isBrowser())
    if (isBrowser() && userId != -1) {
      console.log('first')
      const {dispatch, userId} = this.props;
      dispatch(fetchUser(userId));
    }

  }

  componentWillReceiveProps(props) {
    const { userId, dispatch } = props;
    if (this.props.userId !== userId) {
      console.log(props)
      dispatch(fetchUser(userId));
    }
  }


  render() {
    const { user, repositories } = this.props;

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
          {user.repositories.map(repoId =>
            <RepositoryAbstract
              key={repoId}
              style={{ marginTop: '8px' }}
              repoId={repoId}
              repositories={repositories}
            />
          )}
        </div>
        <Divider style={{ width: '100%' }}/>
        <Subheader>[Star Repositories] (<a href='#'>view all</a>)</Subheader>
        <div className="repoList">
          {user.starlist.map(repoId =>
            <RepositoryAbstract
              key={'star' + repoId}
              style={{ marginTop: '8px' }}
              repoId={repoId}
              repositories={repositories}
            />
          )}
        </div>
      </div>
    );
  }
}

function select(state, ownProps) {
  return {
    user: state.data.users[state.view.content.showUser],
    repositories: state.data.repositories,
    userId: ownProps.params.id
  }
}

export default connect(select)(UserDetail);
