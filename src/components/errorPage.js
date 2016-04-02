import React, { PropTypes } from 'react';
import AlertError from 'material-ui/lib/svg-icons/alert/error';
import { pink500 } from 'material-ui/lib/styles/colors';

function getNotFoundDescription(type = 'page') {
  return `${type} not found!`;
}

function getErrorMessage(pathname, type) {
  let title, description;
  console.log(pathname)
  switch (pathname) {
    case '/error404':
      title = 'Not Found!';
      description = getNotFoundDescription(type);
      break;
    case '/error400':
      title = 'Input Error!';
      description = 'Check your input.';
      break;
    default:
      title = 'A problem happened!';
      description = 'fetch failed!';
      break;
  }

  return { title, description };
}

function ErrorPage(props) {
  const { pathname, state } = props.location;
  let type;
  if (state) {
    type = state.type;
  }


  // console.log('error page', props)
  const { title, description } = getErrorMessage(pathname, type);

  return (
    <div
      className="containerError"
    >
      <div
        className="errorTitle"
      >
        <AlertError
          style={styles.errorIcon}
          color={pink500}
        />
        <span>{title}</span>
      </div>
      <div
        className="errorDescription"
      >
        {description}
      </div>
    </div>
  );
}

const styles = {
  errorIcon: {
    width: 32,
    height: 32
  }
}

export default ErrorPage;
