import React, { PropTypes } from 'react';

function ErrorPage(props) {
  
  console.log(props)
  return (
    <div>{props.route.path}</div>
  );
}

export default ErrorPage;
