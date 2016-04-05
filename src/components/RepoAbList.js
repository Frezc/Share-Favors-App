import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RepoAbstract from './../components/RepositoryAbstract';
import ListFilter from '../components/ListFilter';

const filters = ['Similarity', 'Most Star', 'Newest', 'Oldest', 'Most Items'];

class RepoAbList extends React.Component {

  state = {
    filterIndex: 0
  };

  render() {
    const { repositories } = this.props;

    return (
      <div
        className="repoAbstract"
      >
        <ListFilter
          filters={filters}
          activeIndex={this.state.filterIndex}
          className="filter"
          onFilterChange={index => this.setState({ filterIndex: index })}
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
