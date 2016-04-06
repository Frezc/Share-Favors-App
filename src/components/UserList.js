import React, { PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import Avatar from 'material-ui/lib/avatar';
import { generateAvatarUrl } from '../helpers';
import { defaultUser } from '../constants/defaultStates';

function UserAbstract(props) {
  const { user } = props;

  return (
    <Paper
      className="userCell"
    >
      <Avatar
        src={generateAvatarUrl(user.email, 100)}
        size={96}
      />
      <div
        className="nickname"
      >
        {user.nickname}
      </div>
      <div
        className="email"
      >
        {user.email}
      </div>
      <div
        className="sign"
      >
        {user.sign}
      </div>
    </Paper>
  );
}

function UserList(props) {

  return (
    <div
      className="userList"
    >
      <UserAbstract
        user={defaultUser}
      />
    </div>
  );
}

export default UserList;
