import React, { PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import Avatar from 'material-ui/lib/avatar';
import { generateAvatarUrl, generateCutString } from '../helpers';
import { defaultUser } from '../constants/defaultStates';

function getTestData() {
  let users = [];
  for (var i = 0; i < 100; i++) {
    users.push(defaultUser);
  }

  return users;
}

function UserAbstract(props) {
  const { user, style } = props;

  return (
    <Paper
      className="userCell"
      style={Object.assign({}, style)}
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
        {generateCutString(user.sign, 97)}
      </div>
    </Paper>
  );
}

function UserList(props) {
  const testUsers = getTestData();
  
  return (
    <div
      className="userList"
    >
      {testUsers.map((user, i) =>
        <UserAbstract
          user={user}
          key={i}
        />
      )}
    </div>
  );
}

export default UserList;
