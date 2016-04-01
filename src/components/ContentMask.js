import React, { PropTypes } from 'react';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import AlertError from 'material-ui/lib/svg-icons/alert/error';
import * as Colors from 'material-ui/lib/styles/colors';
import CircularProgress from 'material-ui/lib/circular-progress';

class ContentMask extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      percentage: 1  //动画效果
    }
  }

  shouldShow(content) {
    const { loading, error } = content;

    return loading || error != '';
  }

  onRefreshPress() {
    // this.setState({ percentage: 100 })
  }

  render() {
    const { content } = this.props;
    const refreshStatus = content.loading ? 'loading' : 'ready';

    return (
      <div
        className="loadingMask"
        style={{ visibility: this.shouldShow(content) ? 'visible' : 'hidden' }}
      >
        <span
          onTouchTap={e => this.onRefreshPress()}
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
        {content.loading ||
          <div
            className="containerError"
          >
            <div
              className="errorTitle"
            >
              <AlertError
                style={styles.errorIcon}
                color={Colors.pink500}
              />
              <span>A problem happened!</span>
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
  },
  errorIcon: {
    width: 32,
    height: 32
  }
}

export default ContentMask;
