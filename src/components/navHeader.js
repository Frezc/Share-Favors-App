import React, { PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import MenuItem from 'material-ui/lib/menus/menu-item';

function NavHeader (props) {
  const { img, name } = props;

  return (
    <MenuItem style={{ position: 'relative', height: 64 }}>
      <Avatar
        src={img}
        size={32}
        style={styles.avatar} />
      <div style={styles.name}>{name}</div>
    </MenuItem>
  );
}

const styles = {
  avatar: { 
    position: 'absolute', 
    left: 16, 
    top: 16
  },
  name: {
    position: 'absolute',
    left: 64,
    top: 8,
    fontWeight: 500
  }
};

NavHeader.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default NavHeader;