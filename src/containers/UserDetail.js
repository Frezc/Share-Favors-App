import React, { PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import Subheader from 'material-ui/lib/Subheader';
import Divider from 'material-ui/lib/divider';
import RepositoryAbstract from '../components/RepositoryAbstract';
import { connect } from 'react-redux';
import { generateAvatarUrl } from '../helpers';

function UserDetail(props) {
  const { user, repositories } = props;

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

UserDetail.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    sign: PropTypes.string,
    starlist: PropTypes.array.isRequired,
    repositories: PropTypes.array.isRequired
  }).isRequired,
  repositories: PropTypes.object.isRequired
};

function select(state) {
  return {
    user: state.data.users[state.view.content.showUser],
    repositories: state.data.repositories
  }
}

export default connect(select)(UserDetail);
