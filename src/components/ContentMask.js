import React, { PropTypes } from 'react';
// import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import CircularProgress from 'material-ui/lib/circular-progress';

class ContentMask extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldShow(content) {
    const { loading, error } = content;

    return loading;
  }

  render() {
    const { content } = this.props;
    // const refreshStatus = content.loading ? 'loading' : 'ready';
    // console.log(this.props)
    return (
      <div
        className="loadingMask"
        style={{ visibility: this.shouldShow(content) ? 'visible' : 'hidden' }}
      >
        {content.loading &&
          <span
            style={styles.refreshWrapper}
          >
            {
              // <RefreshIndicator
              //   percentage={100}
              //   size={64}
              //   left={0}
              //   top={0}
              //   status={refreshStatus}
              //   style={styles.refresh}
              // />
            }
            <CircularProgress
              size={5}
              style={styles.refresh}
            />
          </span>
        }
      </div>
    );
  }
}

ContentMask.propTypes = {
  content: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired
}

const styles = {
  refresh: {
    position: 'relative'
  },
  refreshWrapper: {
    borderRadius: '50%',
    cursor: 'pointer'
  }
}

export default ContentMask;
