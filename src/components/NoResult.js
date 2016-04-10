import React, { PropTypes } from 'react';

const styles = {
  root: { padding: 24 }
}

function NoResult(props) {
  const { msg } = props;

  return (
    <div
      style={styles.root}
    >
      {msg}
    </div>
  );
}

NoResult.propTypes = {
  msg: PropTypes.string
};

NoResult.defaultProps = {
  msg: 'No Result'
};

export default NoResult;
