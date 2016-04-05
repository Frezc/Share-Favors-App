import React, { PropTypes } from 'react';

const styles = {
  icon: { width: 16, height: 16 }
};

function getBoundaryUsed (tags) {
  let boundary = {
    min: 0,
    max: 0
  };
  
  if (tags.length > 0) {
    boundary.max = boundary.min = tags[0].used;
    tags.map(tag => {
      if (tag.used < boundary.min) {
        boundary.min = tag.used;
      }
      if (tag.used > boundary.max) {
        boundary.max = tag.used;
      }
    });
  }
  
  return boundary;
}

function generateFontSize (used, boundary) {
  if (boundary.min < boundary.max) {
    let ratio = (used - boundary.min) / (boundary.max - boundary.min);
    ratio = Math.min(1, Math.max(0, ratio));
    return 12 + ratio * 12;
  }

  return 18;
}

function getRootClassName (className) {
  return 'tagPool ' + className;
}

function TagPool (props) {
  const { className, tags, onTagPress } = props;
  const boundary = getBoundaryUsed(tags);
  
  return (
    <div className={getRootClassName(className)}>
      {tags.map(tag =>
        <div
          className="tagContainer"
          key={tag.id}
        >
          <div
            className="tagText"
            style={{ fontSize: generateFontSize(tag.used, boundary) }}
            onTouchTap={() => onTagPress && onTagPress(tag)}
          >
            {tag.text}
          </div>
          <div
            className="tagUsed"
          >
            ({tag.used})
          </div>
        </div>
      )}
    </div>
  );
}

TagPool.propTypes = {
  className: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    used: PropTypes.number.isRequired
  })),
  onTagPress: PropTypes.func
};

TagPool.defaultProps = {
  className: '',
  tags: []
};

export default TagPool;
