import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

function shouldShow(content) {
  const { loading, error } = this.content;

  return loading || error != '';
}

function ContentMask(props) {
  const { content } = props;

  return (
    <div
      className="loadingMask"
      style={{ visibility: shouldShow(content) ? 'visible' : 'hidden' }}
    >
      {content.loading ? 
        <CircularProgress
          size={5}
        />
        :
        <div>{content.error}</div>
      }
      
    </div>
  );
}

ContentMask.propTypes = {
  content: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired
}

export default ContentMask;
