import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class SearchLinkResult extends React.Component {
  
  render() {
    return (
      <div>Links</div>
    );
  }
}

function select(state) {
  return {}
}

export default connect(select)(SearchLinkResult);
