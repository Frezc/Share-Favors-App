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
    index = Math.min(Math.max(1, index), sum);
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

  getItemLocation (offsetY) {
    const { index, sum } = this.validNumber(this.state.showIndex, this.props.sum);

    const handleHeight = this.refs.handleArea.offsetHeight;
    let offsetItem = Math.floor(offsetY / handleHeight * sum);
    return index + offsetItem;
  }

  // offsetTop -> index
  getItemIndex (offsetTop) {
    const { handleArea } = this.refs;
    const { sum } = this.props;
    
    return Math.floor(offsetTop / handleArea.offsetHeight * (sum - 1)) + 1;
  }

  getOffsetTop (offsetY) {
    const { offsetTop } = this.state;
    const { handleArea } = this.refs;
    let newOffsetTop = offsetTop + offsetY;

    return Math.max(Math.min(newOffsetTop, handleArea.offsetHeight), 0);
  }

  // index -> offsetTop
  pinToLocation (index) {
    const { sum } = this.props;
    const { handleArea } = this.refs;

    // play transition
    this.setState({ showTransition: true });

    let offsetTop = handleArea.offsetHeight * (index - 1) / (sum - 1);
    this.setState({
      showIndex: index,
      offsetTop: offsetTop,
      isDragging: false
    })
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

  render () {
    let { style, description, onDragChange, onDoneChange, className } = this.props;

    const { index, sum } = this.validNumber(this.state.showIndex, this.props.sum);

    return (
      <div>
        <div 
          className={this.getEventHandlerClassName()}
          onMouseMove={e => {
            if (this.state.isDragging) {
              console.log('onMouseMove')
              // let newIndex = this.getItemLocation(e.clientY - this.lastLocation);
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
              this.pinToLocation(this.state.showIndex);
              onDoneChange && onDoneChange(index);
            }
          }}
        ></div>
        <div
          className={className}
          style={Object.assign(style, styles.controlBar)}
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
                onClick={e => {
                  const { offsetTop } = this.refs.container;
                  const { offsetHeight } = this.refs.handleArea;
                  let offsetY = e.clientY - offsetTop - 24;
                  // 完善区间判断
                  this.pinToLocation(this.getItemIndex(() % offsetHeight));
                }}
              >
                <div 
                  className="slider-bar"
                  ref="handleArea"
                >
                  <div 
                    className="slider-bar-before"
                    style={{ height: this.state.offsetTop - 4 }}  
                  ></div>
                  <div
                    className="slider-bar-handle"
                    style={{ 
                      top: this.state.offsetTop,
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
                    style={{ height: `calc(100% - ${this.state.offsetTop + 4}px)` }}
                  ></div>
                </div>
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
  style: PropTypes.object,
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  description: PropTypes.string,
  onDragChange: PropTypes.func,
  onDoneChange: PropTypes.func
};

ListControlBar.defaultProps = {
  style: {},
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