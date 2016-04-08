import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import NavHeader from '../components/NavHeader';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';

// actions
import { setNavOpen } from '../actions';
import { setDialogVisible, setDialogContent } from '../actions/dialog';
import { logout } from '../actions/authActions';
import { push } from 'react-router-redux';

// constants
import { DIALOG } from '../constants';

//helper
import { generateAvatarUrl } from '../helpers';

let SelectableList = SelectableContainerEnhance(List);


const styles = {
  linkDeco: {
    textDecoration: 'none'
  }
}

const windowModes = ['normal', 'widescreen'];
// 需要与侧边栏按钮配对的项
const navRouter = ['/repositories', '/stars', '/search', '/explorer', '/tag'];

class MaterialDrawer extends React.Component {

  static propTypes = {
    navOpen: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    windowMode: PropTypes.oneOf(windowModes).isRequired
  };

  getValueByPathname(pathname) {
    // console.log(pathname)
    const reg = /(\/\w*)?(\/\S*)*/i;
    const re = reg.exec(pathname);

    if (re[1]) {
      for (var i = 0; i < navRouter.length; i++) {
        if (navRouter[i] == re[1].toLowerCase()) {
          return i;
        }
      }
    }

    return 3;
  }

  onValueChange = (e, index) => {
    console.log(index)
    const { dispatch } = this.props;
    dispatch(push(navRouter[index]));

  };

  render() {
    const { navOpen, user, dispatch, windowMode, pathname } = this.props;

    const docked = windowMode == windowModes[1];
    const zDepth = docked ? 1 : 2;
    
    const valueLink = {
      value: this.getValueByPathname(pathname),
      requestChange: this.onValueChange
    };

    return (
      <LeftNav
        docked={docked}
        width={280}
        open={docked || navOpen}
        onRequestChange={open => dispatch(setNavOpen(open))}
        zDepth={zDepth}
      >
        <NavHeader
          img={generateAvatarUrl(user.email, 40)}
          name={user.nickname}
          onTouchTap={() => {
            if (user.id == -1) {
              dispatch(setDialogVisible(DIALOG.AUTH, true));
              dispatch(setDialogContent(DIALOG.AUTH, 'auth'));
            } else {
              dispatch(push(`/user/${user.id}`));
              dispatch(setNavOpen(false));
            }
          }}
        />
        <Divider />
        <SelectableList
          valueLink={valueLink}
        >
          <ListItem
            value={0}
          >
            Repositories
          </ListItem>
          <ListItem
            value={1}
          >
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
          <ListItem
            value={4}
          >
            Tags
          </ListItem>
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
}

function select (state) {
  let selectState = {
    navOpen: state.view.navOpen,
    user: state.data.users[state.view.auth.user],
    windowMode: state.view.windowMode
  };
  if (state.router.locationBeforeTransitions) {
    selectState.pathname = state.router.locationBeforeTransitions.pathname;
  } else {
    selectState.pathname = '';
  }
  return selectState;
}

export default connect(select)(MaterialDrawer);
