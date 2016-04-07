import React, { PropTypes } from 'react';

function NotImplementPage(props) {
  return (
    <div>
      You request {props.location.pathname}, but This page hasn't implemented.
    </div>
  );
}

export default NotImplementPage;
