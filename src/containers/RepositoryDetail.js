import React, { PropTypes } from 'react';

//custom components
import RepositoryAbstract from '../components/RepositoryAbstract';
import RepoList from '../components/RepoList';
import ListControlBar from '../components/ListControlBar';
import LinkDialog from '../components/LinkDialog';

import { isBrowser, isNode } from '../helpers';


// libs
import { connect } from 'react-redux';


class RepositoryDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sum: 100,
      showDialog: false
    }
  }
  
  componentDidMount() {
    // console.log(`[RepoDetail] isBrowser: ${isBrowser()}, isNode: ${isNode()}`)
  }

  render () {

    const { linkDialog, repositories } = this.props;

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
          repoId={-1}
          repositories={repositories}
        />
        <RepoList
          style={styles.repoList}
          rootRef={ref => {
            this.repoList = ref;
          }}
          onClick={e => {
            this.setState({ showDialog: true })
          }}
        />
        <ListControlBar
          className="listController"
          sum={this.state.sum}
          description={'This is Repos'}
          onDoneChange={percent => {
            // console.log(percent);
          }}
        />
        <LinkDialog
          type="watch"
          loading={linkDialog.loading}
          visible={linkDialog.visible}
          error={linkDialog.error}
          link={linkDialog.link}
        />
      </div>
    );
  }
}

RepositoryDetail.propTypes = {
  repositories: PropTypes.object.isRequired,
  linkDialog: PropTypes.shape({
    type: PropTypes.oneOf(['watch', 'edit']).isRequired,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    link: PropTypes.object.isRequired,
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
  },
  repoList: {
    marginTop: 24
  }
}

function select (state) {
  return {
    repositories: state.data.repositories,
    linkDialog: state.view.dialogs.linkDialog
  };
}

export default connect(select)(RepositoryDetail);