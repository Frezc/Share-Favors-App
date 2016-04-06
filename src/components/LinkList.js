import React, { PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import { generateCutString } from '../helpers';
import { defaultLink } from '../constants/defaultStates';


function getTestLinks() {
  let links = [];
  for (var i = 0; i < 100; i++) {
    links.push(Object.assign({}, defaultLink, {
      id: i,
      repoId: -1,
      repoTitle: 'katsura_doujinshi'
    }));
  }
  return links;
}

function LinkAbstract(props) {
  const defaultString = 'No description.';
  const { link } = props;

  return (
    <Paper
      className="linkLine"
    >
      <div
        className="title"
      >
        <a onClick={e => {e.preventDefault();e.stopPropagation();}}>
          {link.repoTitle}
        </a>
        /
        <a onClick={e => {e.preventDefault();e.stopPropagation();}}>
          {link.title}
        </a>
      </div>
      <div
        className="url"
      >
        {link.url}
      </div>
      <div
        className="description"
      >
        {generateCutString(link.description, 180)}
      </div>
    </Paper>
  );
}

function LinkList(props) {
  const testLinks = getTestLinks();

  return (
    <div
      className="linkList"
    >
      {testLinks.map(link =>
        <LinkAbstract
          link={link}
          key={link.id}
        />
      )}
    </div>
  );
}

LinkAbstract.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    repoId: PropTypes.number.isRequired,
    repoTitle: PropTypes.string.isRequired
  }).isRequired
};

export default LinkList;
