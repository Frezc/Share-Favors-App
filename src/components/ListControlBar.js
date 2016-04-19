import React, { PropTypes } from 'react';

class ListControlBar extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    currentIndex: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired, // [0, 1]
    handleHeight: PropTypes.number,      // [0.1, 1]
    description: PropTypes.string,
    onDragChange: PropTypes.func,        // test performance
    onDoneChange: PropTypes.func,         // when change
    onScroll: PropTypes.func,
    scrollOffset: PropTypes.number       // top offset
  };

  static defaultProps = {
    className: '',
    description: 'Hold to Move',
    handleHeight: 0.1,
    scrollOffset: 0
  };


  state = {
    offsetTop: 0,
    showTransition: false,
    percent: 0
  };

  isDragging = false;

  // make sure height of handle in [.1, 1]
  static validHandleHeight(height) {
    return Math.max(Math.min(height, 1), 0.1);
  }

  generatePercentString (number) {
    return number * 100 + '%';
  }

  generateHeightCSS (number) {
    return `calc(${number * 100}% - 4px)`;
  }

  outOfBound ({ clientX, clientY }) {
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = this.refs.container;
    if (clientX < offsetLeft || clientX > offsetLeft + offsetWidth) {
      return true;
    }

    if (clientY < offsetTop || clientY > offsetTop + offsetHeight) {
      return true;
    }

    return false;
  }

  // get length of handler on px;
  getHandlerLength() {
    const { offsetHeight } = this.refs.handler;

    return offsetHeight;
  }

  // get length of handle bar. min: 10%.
  generateHandlerLengthStyle () {
    const { handleHeight } = this.props;

    return this.generatePercentString(handleHeight);
  }

  getOffsetTop (offsetY) {
    // const { offsetTop } = this.state;
    const { offsetTop } = this.refs.handler;
    const { handleBarContainer } = this.refs;
    let newOffsetTop = offsetTop + offsetY;

    return Math.max(Math.min(newOffsetTop, handleBarContainer.offsetHeight - this.getHandlerLength()), 0);
  }

  // offsetTop -> percent
  getPercentFromOffsetTop (offsetTop) {
    const { handleBarContainer } = this.refs;

    return offsetTop / (handleBarContainer.offsetHeight - this.getHandlerLength());
  }

  // props.percent -> offsetTop(percent) of handler
  getPercentTopFromPercent () {
    const { handleHeight } = this.props;
    const { percent } = this.state;

    return (1 - handleHeight) * percent;
  }

  // fix transition bug
  getTransition () {
    if (this.state.showTransition) {
      return 'top .2s';
    } else {
      return '';
    }
  }

  getEventHandlerClassName () {
    if (this.isDragging) {
      return 'eventHandler active';
    } else {
      return 'eventHandler inactive';
    }
  }

  /**
   * return the bottom click-able area offset now (after mount)
   */
  getBottomOffset () {
    const { percent } = this.state;

    if (this.refs.handleBarContainer) {
      const { offsetHeight } = this.refs.handleBarContainer;

      return percent * (offsetHeight - this.getHandlerLength()) + this.getHandlerLength();
    }

    return 0;
  }

  componentWillReceiveProps(newProps) {
    const { percent } = newProps;
    if (percent != this.state.percent) {
      this.setState({ percent });
    }
  }

  render () {
    let { description, onDragChange, onDoneChange, className, sum, currentIndex, handleHeight } = this.props;

    return (
      <div>
        <div
          className={this.getEventHandlerClassName()}
          onMouseDown={e => {
            // 防止出现一直拖动的bug
            if (this.isDragging) {
              this.isDragging = false;
            }
          }}
          onMouseMove={e => {
            if (this.isDragging) {
              // console.log('onMouseMove')
              let offsetTop = this.getOffsetTop(e.clientY - this.lastLocation);
              // let newIndex = this.getItemIndex(offsetTop);
              // onDragChange && onDragChange(this.getPercentFromOffsetTop(offsetTop));
              // 改用内部state来更新，使用props传递太慢
              const percent = this.getPercentFromOffsetTop(offsetTop);
              this.setState({ percent: percent });
              onDragChange && onDragChange(percent);
              this.lastLocation = e.clientY;
            }
          }}
          onMouseUp={e => {
            if (this.isDragging) {
              // console.log('onMouseUp')
              let offsetTop = this.getOffsetTop(e.clientY - this.lastLocation);
              // this.pinToLocation(index, false);
              onDoneChange && onDoneChange(this.getPercentFromOffsetTop(offsetTop));
              this.isDragging = false;
            }
          }}
        ></div>
        <div
          className={className}
          style={styles.controlBar}
          ref="container"
        >
          <div className="listControl">
            <div className="slider">
              <div
                className="slider-top"
                onClick={e => {
                  this.setState({ showTransition: true });
                  onDoneChange && onDoneChange(0);
                }}
              >Top</div>
              <div
                className="slider-bar-container"
                ref="handleBarContainer"
                onClick={e => {
                  //todo
                  const { offsetTop } = this.refs.container;
                  const { offsetHeight } = this.refs.handleBarContainer;
                  let offsetY = e.clientY - offsetTop - 24;
                  const availableLength = offsetHeight - this.getHandlerLength();
                  const bottomOffset = this.getBottomOffset();
                  if (offsetY > bottomOffset) {
                    offsetY -= this.getHandlerLength();
                  }
                  offsetY = Math.min(Math.max(offsetY, 0), availableLength);
                  // let newIndex = this.getItemIndex(offsetY);
                  let newPercent = this.getPercentFromOffsetTop(offsetY);
                  this.setState({ showTransition: true });
                  onDoneChange && onDoneChange(newPercent);
                }}
              >
                <div
                  className="slider-bar-before"
                  style={{ height: this.generateHeightCSS(this.getPercentTopFromPercent()) }}
                ></div>
                <div
                  className="slider-bar-handle"
                  style={{
                    top: this.generatePercentString(this.getPercentTopFromPercent()),
                    height: this.generateHandlerLengthStyle(),
                    transition: this.getTransition()
                  }}
                  ref="handler"
                  onMouseDown={e => {
                    console.log('onMouseDown')
                    this.setState({
                      showTransition: false
                    });
                    this.isDragging = true;
                    this.lastLocation = e.clientY;
                  }}
                >
                  <div className="slider-bar">
                  </div>
                  <div className="slider-info">
                    <strong>
                      <div className="slider-index">{currentIndex} of {sum} items</div>
                    </strong>
                    <div className="slider-description">{description}</div>
                  </div>
                </div>
                <div
                  className="slider-bar-after"
                  style={{ height: `calc(${this.generatePercentString(1.0 - handleHeight - this.getPercentTopFromPercent())} - 4px)` }}
                ></div>
              </div>
              <div
                className="slider-bottom"
                onClick={e => {
                  // this.pinToLocation(sum);
                  this.setState({ showTransition: true });
                  onDoneChange && onDoneChange(1);
                }}
              >Bottom</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  controlBar: {
    position: 'fixed',
    boxSizing: 'border-box',
    height: '40%'
  }
};

export default ListControlBar;