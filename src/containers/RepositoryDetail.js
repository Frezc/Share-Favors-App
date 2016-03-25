import React, { PropTypes } from 'react';

//custom components
import RepositoryAbstract from '../components/RepositoryAbstract';
import RepoList from '../components/RepoList';
import ListControlBar from '../components/ListControlBar';
import LinkDialog from '../components/LinkDialog';

// libs
import { connect } from 'react-redux';


class RepositoryDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      percent: 0,
      sum: 100,
      showDialog: false
    }

    // 解决在scroll bar在更新时相应时间而导致ListControlBar显示出错的问题
    this.activeScrollListener = true;

    this.scrollListener = () => {
      console.log('scroll', window.scrollY)
      if (this.activeScrollListener) {
        let percent = (window.scrollY + window.innerHeight - this.repoList.offsetTop - 64 - 72) / (49 * this.state.sum);
        percent = Math.min(Math.max(0, percent), 1);
        if (percent != this.state.percent) {
          this.setState({ percent });
        }
      }
    }

    this.onDoneChange = percent => {
      let scrollOffset = this.repoList.offsetTop + 64 + 72 + 49 * this.state.sum * percent - window.innerHeight;
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

    const { linkDialog, repositories, tags, links } = this.props;

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
          onClick={e => {
            this.setState({ showDialog: true })
          }}
        />
        <ListControlBar
          className="listController"
          index={this.state.index}
          percent={this.state.percent}
          sum={this.state.sum}
          description={'This is Repos'}
          onDragChange={percent => {
            // let scrollOffset = this.repoList.offsetTop + 64 + 72 + 49 * index - window.innerHeight;
            // window.scrollTo(0, scrollOffset);
            // console.log('drag percent', percent)
            this.setState({ percent })
          }}
          onDoneChange={percent => {
            // console.log(percent);
            this.setState({ percent })
            this.onDoneChange(percent)
          }}
        />
        <LinkDialog
          type="watch"
          loading={linkDialog.loading}
          show={linkDialog.show}
          error={linkDialog.error}
          link={links[linkDialog.link]}
          tags={tags}
        />
      </div>
    );
  }
}

RepositoryDetail.propTypes = {
  repositories: PropTypes.object.isRequired,
  links: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  linkDialog: PropTypes.shape({
    type: PropTypes.oneOf(['watch', 'edit']).isRequired,
    show: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    link: PropTypes.number.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired
};

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

function select (state) {
  return {
    repositories: state.data.repositories,
    links: state.data.links,
    tags: state.data.tags,
    linkDialog: state.view.dialogs.linkDialog
  };
}

export default connect(select)(RepositoryDetail);