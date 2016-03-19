import React, { PropTypes } from 'react';
import RepositoryAbstract from '../components/RepositoryAbstract';
import RepoList from '../components/RepoList';


function RepositoryDetail (props) {

  const actions = [{
    label: 'Star'
  }, {
    label: 'Edit'
  }];

  return (
    <div className="repoDetail">
      <RepositoryAbstract
        actions={actions}
      />
      <RepoList />
    </div>
  );
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