import React, { PropTypes } from 'react';
// import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import CircularProgress from 'material-ui/lib/circular-progress';
import { pink500 } from 'material-ui/lib/styles/colors';
import AlertError from 'material-ui/lib/svg-icons/alert/error';

const styles = {
  refresh: {
    position: 'relative'
  },
  refreshWrapper: {
    borderRadius: '50%',
    cursor: 'pointer'
  }
}

class ContentMask extends React.Component {
  
  static propTypes = {
    content: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired
    }).isRequired
  };

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
        {content.loading ?
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
          :
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
              <span>A problem arose!</span>
            </div>
            <div
              className="errorDescription"
            >
              {content.error}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ContentMask;
