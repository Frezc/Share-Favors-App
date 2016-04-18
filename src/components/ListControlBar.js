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
    handleHeight: 0.15,
    scrollOffset: 0
  };


  state = {
    offsetTop: 0,
    showTransition: false,
    percent: 0
  };

  isDragging = false;

  // 解决在scroll bar在更新时相应时间而导致ListControlBar显示出错的问题
  activeScrollListener = true;

  scrollListener = () => {
    // console.log('scroll', window.scrollY)
    if (this.activeScrollListener) {
      const { scrollOffset } = this.props;
      // todo
      // 测试数据 正式由于条目不会全部加载 所以需要另外的方法
      let percent = (window.scrollY - scrollOffset) / (document.documentElement.scrollHeight - window.innerHeight - scrollOffset);
      // console.log('percent', percent)

      percent = Math.min(Math.max(0, percent), 1);
      if (percent != this.state.percent) {
        this.setState({ percent });
      }
    }
  };

  componentDidMount () {
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollListener);
  }

  componentWillReceiveProps(newProps) {
    const { percent } = newProps;
    if (percent != this.state.percent) {
      this.setState({ percent });
    }
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

  // get length of handle bar. min: 10%.
  generateHandlerLengthStyle () {
    const { handleHeight } = this.props;

    return this.generatePercentString(Math.min(Math.max(handleHeight, 0.1), 1));
  }

  // deprecated
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

    const validHeight = Math.min(Math.max(handleHeight, 0.1), 1);
    return (1 - validHeight) * percent;
  }

  // deprecated
  // props.percent -> index
  // [1, sum]
  getIndexFromPercent () {
    const { sum } = this.props;
    const { percent } = this.state;
    if (sum == 1) {
      return 1;
    } else {
      return Math.max(Math.ceil(sum * percent), 1);
    }
  }

  // index -> offsetTop
  // deprecated
  pinToLocation (index, transition = true) {
    // console.log('pin to', index)

    const { sum } = this.props;
    const { handleBarContainer } = this.refs;

    // play transition
    this.setState({ showTransition: transition });

    if (sum === 1) {
      this.isDragging = false;
    } else {

      let offsetTop = (handleBarContainer.offsetHeight - this.getHandlerLength())
        * (index - 1) / (sum - 1);
      this.setState({
        showIndex: index,
        offsetTop: offsetTop
      });
      this.isDragging = false;
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
    if (this.isDragging) {
      return 'eventHandler active';
    } else {
      return 'eventHandler inactive';
    }
  }

  // todo: no need to scroll in this component
  onDoneChange(percent) {
    const { onDoneChange, scrollOffset } = this.props;

    // 测试数据 同上
    const offset = (document.documentElement.scrollHeight - window.innerHeight - scrollOffset) * percent + scrollOffset;
    // console.log('offset', offset)
    const scrollStep = (offset - window.scrollY) / 10;
    let step = 0;

    window.clearInterval(this.timer);
    this.activeScrollListener = false;
    this.timer = window.setInterval(() => {
      step++;
      if (step > 10) {
        window.clearInterval(this.timer);
        this.activeScrollListener = true;
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 17);

    this.setState({ percent: percent });
    onDoneChange && onDoneChange(percent);
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
              this.onDoneChange(this.getPercentFromOffsetTop(offsetTop));
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
                  // this.pinToLocation(1);
                  this.setState({ showTransition: true });
                  this.onDoneChange(0);
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
                  offsetY = Math.min(Math.max(offsetY, 0), offsetHeight - this.getHandlerLength());
                  // let newIndex = this.getItemIndex(offsetY);
                  let newPercent = this.getPercentFromOffsetTop(offsetY);
                  this.setState({ showTransition: true });
                  this.onDoneChange(newPercent);
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
                  this.onDoneChange(1);
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