import React, { PropTypes } from 'react';

function validNumber ({ index, sum }) {
  sum = Math.max(1, sum);
  index = Math.min(Math.max(1, index), sum);
  return { index, sum };
}

function generatePercent (number) {
  return number * 100 + '%';
}

function generateHeightCSS (number) {
  return `calc(${number * 100}% - 4px)`;
}

function ListControlBar (props) {
  let { style, description } = props;

  let { index, sum } = validNumber(props);

  return (
    <div style={Object.assign(style, styles.controlBar)}>
      <div className="listControl">
        <div className="slider">
          <div className="slider-top">Top</div>
          <div className="slider-bar">
            <div 
              className="slider-bar-before"
              style={{ height: generateHeightCSS(index / sum) }}  
            ></div>
            <div 
              className="slider-bar-handle"
              style={{ top: generatePercent(index / sum) }}
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
              style={{ height: generateHeightCSS(1 - index / sum) }}
            ></div>
          </div>
          <div className="slider-bottom">Last</div>
        </div>
      </div>
    </div>
  );
}

ListControlBar.propTypes = {
  style: PropTypes.object,
  index: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  description: PropTypes.string
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