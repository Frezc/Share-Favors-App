import React, { PropTypes } from 'react';

class ListControlBar extends React.Component {

  validNumber ({ index, sum }) {
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
    const { index, sum } = this.validNumber(this.props);

    const handleHeight = this.refs.handleArea.offsetHeight;
    let offsetItem = Math.floor(offsetY / handleHeight * sum);

    return index + offsetItem;
  }

  render () {
    let { style, description, onChange } = this.props;

    const { index, sum } = this.validNumber(this.props);

    let zeroIndex = index - 1;

    return (
      <div 
        style={Object.assign(style, styles.controlBar)}
        ref="container"
      >
        <div className="listControl">
          <div className="slider">
            <div 
              className="slider-top"
              onClick={e => onChange(0)}
            >Top</div>
            <div className="slider-bar-container">
              <div 
                className="slider-bar"
                ref="handleArea"
              >
                <div 
                  className="slider-bar-before"
                  style={{ height: this.generateHeightCSS(index / sum) }}  
                ></div>
                <div 
                  className="slider-bar-handle"
                  style={{ top: this.generatePercent(index / sum) }}
                  onMouseDown={e => {
                    e.preventDefault();
                    this.lastLocation = e.clientY;
                    this.isDragging = true;
                  }}
                  onMouseMove={e => {
                    e.preventDefault();
                    if (this.isDragging) {
                      onChange(this.getItemLocation(e.clientY - this.lastLocation));
                      this.lastLocation = e.clientY;
                    }
                  }}
                  onMouseOut={e => {
                    this.isDragging = false;
                  }}
                  onMouseUp={e => {
                    e.preventDefault();
                    if (this.isDragging) {
                      this.isDragging = false;
                    }
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
                  style={{ height: this.generateHeightCSS(1 - index / sum) }}
                ></div>
              </div>
            </div>
            <div 
              className="slider-bottom"
              onClick={e => onChange(sum)}
            >Last</div>
          </div>
        </div>
      </div>
    );
  }
}

ListControlBar.propTypes = {
  style: PropTypes.object,
  index: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func
};

ListControlBar.defaultProps = {
  style: {},
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