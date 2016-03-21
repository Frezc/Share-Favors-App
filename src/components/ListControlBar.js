import React, { PropTypes } from 'react';

class ListControlBar extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      showIndex: 1,
      offsetTop: 0,
      isDragging: false,
      showTransition: false
    };
  }

  validNumber (index, sum) {
    sum = Math.max(1, sum);
    index = Math.min(Math.max(index, 1), sum);
    return { index, sum };
  }

  generatePercent (number) {
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

  // get length of handle bar. min: 15%.
  getHandlerLength() {
    const { offsetHeight } = this.refs.handler;

    return offsetHeight;
  }

  generateHandlerLengthStyle () {
    const { sum } = this.props;

    let length = this.generatePercent(Math.max(1.0 / sum, 0.15));
    return length;
  }

  // offsetTop -> index
  getItemIndex (offsetTop) {
    const { handleBarContainer } = this.refs;
    const { sum } = this.props;

    let index = Math.ceil(offsetTop / ((handleBarContainer.offsetHeight - this.getHandlerLength()) / sum));
    if (index == 0) index = 1;
    return index;
    // return Math.floor(offsetTop / handleBarContainer.offsetHeight * (sum - 1)) + 1;
  }

  getOffsetTop (offsetY) {
    const { offsetTop } = this.state;
    const { handleBarContainer } = this.refs;
    let newOffsetTop = offsetTop + offsetY;

    return Math.max(Math.min(newOffsetTop, handleBarContainer.offsetHeight - this.getHandlerLength()), 0);
  }

  // index -> offsetTop
  pinToLocation (index, transition = true) {
    console.log('pin to', index)

    const { sum } = this.props;
    const { handleBarContainer } = this.refs;

    // play transition
    this.setState({ showTransition: transition });

    if (sum === 1) {
      this.setState({
        isDragging: false
      });
    } else {

      let offsetTop = (handleBarContainer.offsetHeight - this.getHandlerLength()) 
        * (index - 1) / (sum - 1);
      this.setState({
        showIndex: index,
        offsetTop: offsetTop,
        isDragging: false
      });
    }
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
    if (this.state.isDragging) {
      return 'eventHandler active';
    } else {
      return 'eventHandler inactive';
    }
  }

  componentWillReceiveProps(props) {
    this.pinToLocation(props.index, false);
  }

  render () {
    let { description, onDragChange, onDragDoneChange, onDoneChange, className } = this.props;

    const { index, sum } = this.validNumber(this.state.showIndex, this.props.sum);

    return (
      <div>
        <div 
          className={this.getEventHandlerClassName()}
          onMouseDown={e => {
            // 防止出现一直拖动的bug
            if (this.state.isDragging) {
              this.setState({ isDragging: false });
            }
          }}
          onMouseMove={e => {
            if (this.state.isDragging) {
              console.log('onMouseMove')
              let offsetTop = this.getOffsetTop(e.clientY - this.lastLocation);
              let newIndex = this.getItemIndex(offsetTop);
              onDragChange && onDragChange(newIndex);
              this.setState({ 
                showIndex: newIndex,
                offsetTop: offsetTop
              });
              this.lastLocation = e.clientY;
            }
          }}
          onMouseUp={e => {
            if (this.state.isDragging) {
              console.log('onMouseUp')
              this.pinToLocation(index, false);
              onDragDoneChange && onDragDoneChange(index);
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
                  this.pinToLocation(1);
                  onDoneChange && onDoneChange(0);
                }}
              >Top</div>
              <div 
                className="slider-bar-container"
                ref="handleBarContainer"
                onClick={e => {
                  const { offsetTop } = this.refs.container;
                  const { offsetHeight } = this.refs.handleBarContainer;
                  let offsetY = e.clientY - offsetTop - 24;
                  offsetY = Math.min(Math.max(offsetY, 0), offsetHeight - this.getHandlerLength());
                  let newIndex = this.getItemIndex(offsetY);
                  this.pinToLocation(newIndex);
                  onDoneChange && onDoneChange(newIndex);
                }}
              >
                <div 
                  className="slider-bar-before"
                  style={{ height: this.state.offsetTop - 4 }}  
                ></div>
                <div
                  className="slider-bar-handle"
                  style={{ 
                    top: this.state.offsetTop,
                    height: this.generateHandlerLengthStyle(),
                    transition: this.getTransition()
                  }}
                  ref="handler"
                  onMouseDown={e => {
                    console.log('onMouseDown')
                    this.setState({ showTransition: false });
                    this.lastLocation = e.clientY;
                    this.setState({ isDragging: true });
                  }}
                >
                  <div className="slider-bar">
                  </div>
                  <div className="slider-info">
                    <strong>
                      <div className="slider-index">{index} of {sum} items</div>
                    </strong>
                    <div className="slider-description">{description}</div>
                  </div>
                </div>
                <div 
                  className="slider-bar-after"
                  style={{ height: `calc(${this.generatePercent(1.0 - Math.max(1.0 / sum, 0.15))} - ${this.state.offsetTop + 12}px)` }}
                ></div>
              </div>
              <div 
                className="slider-bottom"
                onClick={e => {
                  this.pinToLocation(sum);
                  onDoneChange && onDoneChange(sum);
                }}
              >Last</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ListControlBar.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  description: PropTypes.string,
  onDragChange: PropTypes.func,
  onDragDoneChange: PropTypes.func,
  onDoneChange: PropTypes.func
};

ListControlBar.defaultProps = {
  className: '',
  description: '0%'
};

const styles = {
  controlBar: {
    position: 'fixed',
    boxSizing: 'border-box',
    height: '40%'
  }
};

export default ListControlBar;