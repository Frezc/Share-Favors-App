import React, { PropTypes } from 'react';
import RepositoryAbstract from '../components/RepositoryAbstract';
import RepoList from '../components/RepoList';
import ListControlBar from '../components/ListControlBar';

class RepositoryDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 1
    }

    // 解决在scroll bar在更新时相应时间而导致ListControlBar显示出错的问题
    this.activeScrollListener = true;

    this.scrollListener = () => {
      console.log('scroll', window.scrollY)
      if (this.activeScrollListener) {
        let index = (window.scrollY + window.innerHeight - this.repoList.offsetTop - 64 - 72) / 49;
        index = Math.floor(index);
        if (index != this.state.index) {
          this.setState({ index: index });
        }
      }
    }

    this.onDoneChange = index => {
      let scrollOffset = this.repoList.offsetTop + 64 + 72 + 49 * index - window.innerHeight;
      const scrollStep = (scrollOffset - window.scrollY) / 10;
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
    };
  }

  componentDidMount () {
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollListener);
  }

  render () {

    const actions = [{
      label: 'Star'
    }, {
      label: 'Edit'
    }];

    

    return (
      <div 
        className="repoDetail"
      >
        <RepositoryAbstract
          actions={actions}
        />
        <RepoList
          rootRef={ref => {
            this.repoList = ref;
          }}
        />
        <ListControlBar
          className="listControler"
          index={this.state.index}
          sum={100}
          description={'This is Repos'}
          onDragChange={index => {
            // let scrollOffset = this.repoList.offsetTop + 64 + 72 + 49 * index - window.innerHeight;
            // window.scrollTo(0, scrollOffset);
          }}
          onDragDoneChange={this.onDoneChange}
          onDoneChange={this.onDoneChange}
        />
      </div>
    );
  }
}

const styles = {
  subtitleIcon: {
    width: 18, 
    height: 18
  },
  columnIcon: {
    width: 24,
    height: 24
  }
}

export default RepositoryDetail;