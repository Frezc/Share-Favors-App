import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import NavHeader from '../components/NavHeader';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';

import { Link } from 'react-router';

// actions
import { setNavOpen } from '../actions';
import { setDialogVisible, setDialogContent } from '../actions/dialog';
import { logout } from '../actions/authActions';

// constants
import { DIALOG } from '../constants';

//helper
import { generateAvatarUrl } from '../helpers';

let SelectableList = SelectableContainerEnhance(List);

function LinkListItem(props) {
  const { href, value } = props;

  return (
    <Link
      to={href}
      style={styles.linkDeco}
    >
      <ListItem
        value={value}
      >
        {props.children}
      </ListItem>
    </Link>
  );
}

function MaterialDrawer(props) {
  const { navOpen, user, dispatch } = props;

  return (
    <LeftNav
      docked={false}
      width={280}
      open={navOpen}
      onRequestChange={open => dispatch(setNavOpen(open))}
      docked={false}
    >
      <NavHeader
        img={generateAvatarUrl(user.email, 40)}
        name={user.nickname}
        onTouchTap={e => {
          if (user.id == -1) {
            dispatch(setDialogVisible(DIALOG.AUTH, true));
            dispatch(setDialogContent(DIALOG.AUTH, 'auth'));
          }
        }}
      />
      <Divider />
      <SelectableList
        valueLink={{ value: 0, requestChange: (e, index) => {} }}
      >
        <ListItem
          value={0}
          primaryText="Repositories"
        />
        <ListItem
          value={1}>
          Stars
        </ListItem>
        <Divider />
        <ListItem
          value={2}
        >
          Search
        </ListItem>
        <ListItem
          value={3}
        >
          Explorer
        </ListItem>
        <LinkListItem
          href="/user/4"
          value={3}
        >
          Users
        </LinkListItem>
      </SelectableList>

      <Divider />
      <MenuItem
        disabled={user.id == -1}
        onTouchTap={e => {
          dispatch(logout());
        }}
      >
        Logout
      </MenuItem>
    </LeftNav>
  );
}

MaterialDrawer.propTypes = {
  navOpen: PropTypes.bool.isRequired
};

const styles = {
  linkDeco: {
    textDecoration: 'none'
  }
}

function select (state) {
  return {
    navOpen: state.view.navOpen,
    user: state.data.users[state.view.auth.user]
  };
}

export default connect(select)(MaterialDrawer);
