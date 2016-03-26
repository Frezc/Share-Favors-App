import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import NavHeader from '../components/NavHeader';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';

// actions
import { setNavOpen } from '../actions';
import { setDialogVisible } from '../actions/dialog';

// constants
import { DIALOG } from '../constants';

//helper
import { generateAvatarUrl } from '../helpers';

let SelectableList = SelectableContainerEnhance(List);

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
          dispatch(setDialogVisible(DIALOG.AUTH, true));
        }}
      />
      <Divider />
      <SelectableList
        valueLink={{ value: 0, requestChange: (e, index) => {console.log(index)} }}
      >
        <ListItem
          value={0}
          primaryText="Repositories"
        />
        <ListItem
          value={1}>Menu Item 2</ListItem>
      </SelectableList>
    </LeftNav>
  );
}

MaterialDrawer.propTypes = {
  navOpen: PropTypes.bool.isRequired
};

function select (state) {
  return {
    navOpen: state.view.navOpen,
    user: state.data.users[state.view.auth.user]
  };
}

export default connect(select)(MaterialDrawer);
