import React, { PropTypes } from 'react';

function ListControlBar (props) {
  let { style } = props;

  return (
    <div style={Object.assign(style, styles.controlBar)}>
      <div className="listControl">
        <div className="slider">
          <div className="slider-top">Top</div>
          <div className="slider-bar">
            <div className="slider-bar-before"></div>
            <div className="slider-bar-handle">
              <div className="slider-bar">
              </div>
              <div className="slider-info">
                <strong>
                  <div className="slider-index">5 of 1244 items</div>
                </strong>
                <div className="slider-description">这是链接</div>
              </div>
            </div>
            <div className="slider-bar-after"></div>
          </div>
          <div className="slider-bottom">Last</div>
        </div>
      </div>
    </div>
  );
}

ListControlBar.propTypes = {
  style: PropTypes.object
};

ListControlBar.defaultProps = {
  style: {}
};

const styles = {
  controlBar: {
    position: 'fixed',
    boxSizing: 'border-box',
    height: '50%'
  }
};

export default ListControlBar;