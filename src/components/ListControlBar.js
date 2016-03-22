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

  // get length of handle bar. min: 15%.
  generateHandlerLengthStyle () {
    const { sum } = this.props;

    let length = this.generatePercentString(Math.max(1.0 / sum, 0.15));
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

  // offsetTop -> percent
  getPercentFromOffsetTop (offsetTop) {
    const { handleBarContainer } = this.refs;

    return offsetTop / (handleBarContainer.offsetHeight - this.getHandlerLength());
  }

  // props.percent -> offsetTop(percent) of handler
  getPercentTopFromPercent () {
    const { sum, percent } = this.props;
    return (1 - Math.max(1.0 / sum, 0.15)) * percent;
  }

  // props.percent -> index
  // [1, sum]
  getIndexFromPercent () {
    const { sum, percent } = this.props;
    if (sum == 1) {
      return 1;
    } else {
      return Math.ceil(sum * percent);
    }
  }

  // index -> offsetTop
  // desperate
  pinToLocation (index, transition = true) {
    // console.log('pin to', index)

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
    let { percent, description, onDragChange, onDoneChange, className, sum } = this.props;

    percent = Math.max(Math.min(percent, 1), 0);

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
              onDragChange && onDragChange(this.getPercentFromOffsetTop());
              this.lastLocation = e.clientY;
            }
          }}
          onMouseUp={e => {
            if (this.state.isDragging) {
              console.log('onMouseUp')
              // this.pinToLocation(index, false);
              onDoneChange && onDoneChange(this.getPercentFromOffsetTop());
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
                      showTransition: false,
                      isDragging: true
                    });
                    this.lastLocation = e.clientY;
                  }}
                >
                  <div className="slider-bar">
                  </div>
                  <div className="slider-info">
                    <strong>
                      <div className="slider-index">{this.getIndexFromPercent()} of {sum} items</div>
                    </strong>
                    <div className="slider-description">{description}</div>
                  </div>
                </div>
                <div 
                  className="slider-bar-after"
                  style={{ height: `calc(${this.generatePercentString(1.0 - Math.max(1.0 / sum, 0.15) - this.getPercentTopFromPercent())} - 12px)` }}
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
  sum: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired, // [0, 1]
  description: PropTypes.string,
  onDragChange: PropTypes.func,
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