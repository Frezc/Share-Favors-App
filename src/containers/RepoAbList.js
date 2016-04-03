import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbstract from './../components/RepositoryAbstract';
import ListFilter from '../components/ListFilter';

class RepoAbList extends React.Component {

  render() {
    const { repositories } = this.props;

    return (
      <div
        className="repoAbstract"
      >
        <ListFilter />

        <RepoAbstract
          className="item"
          repoId={-1}
          repositories={repositories}
        />
        <RepoAbstract
          className="item"
          repoId={-1}
          repositories={repositories}
        />
        <RepoAbstract
          className="item"
          repoId={-1}
          repositories={repositories}
        />
        <RepoAbstract
          className="item"
          repoId={-1}
          repositories={repositories}
        />
        <RepoAbstract
          className="item"
          repoId={-1}
          repositories={repositories}
        />


      </div>
    );
  }
}

function select(state) {
  return {
    repositories: state.data.repositories
  }
}

export default connect(select)(RepoAbList);
