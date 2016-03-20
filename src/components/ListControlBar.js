import React, { PropTypes } from 'react';

class ListControlBar extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      showIndex: 1,
      offsetTop: 0
    };

    this.isDragging = false;
  }

  validNumber (index, sum) {
    console.log(index)
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

  getEventHandlerClassName (isActive) {
    if (isActive) {
      return 'eventHandler active';
    } else {
      return 'eventHandler inactive';
    }
  }

  render () {
    let { style, description, onDragChange, onDoneChange, className, isActive } = this.props;

    const { index, sum } = this.validNumber(this.state.showIndex, this.props.sum);

    let zeroIndex = index - 1;

    return (
      <div>
        <div 
          className={this.getEventHandlerClassName(isActive)}
          onMouseMove={e => {
            if (this.isDragging) {
              console.log('onMouseMove')
              let newIndex = this.getItemLocation(e.clientY - this.lastLocation);
              onDragChange && onDragChange(newIndex);
              // this.setState({ showIndex: newIndex });
              this.setState({ offsetTop: this.state.offsetTop + e.clientY - this.lastLocation })
              this.lastLocation = e.clientY;
            }
          }}
          onMouseUp={e => {
            if (this.isDragging) {
              console.log('onMouseUp')
              this.isDragging = false;
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
                onClick={e => onDoneChange && onDoneChange(0)}
              >Top</div>
              <div className="slider-bar-container">
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
                    style={{ top: this.state.offsetTop }}
                    ref="handler"
                    onMouseDown={e => {
                      console.log('onMouseDown')
                      this.lastLocation = e.clientY;
                      this.isDragging = true;
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
                    style={{ height: `calc(100% - ${this.state.offsetTop + 4})` }}
                  ></div>
                </div>
              </div>
              <div 
                className="slider-bottom"
                onClick={e => onDoneChange && onDoneChange(sum)}
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
  onDoneChange: PropTypes.func,
  isActive: PropTypes.bool
};

ListControlBar.defaultProps = {
  style: {},
  className: '',
  description: '0%',
  isActive: false
};

const styles = {
  controlBar: {
    position: 'fixed',
    boxSizing: 'border-box',
    height: '40%'
  }
};

export default ListControlBar;