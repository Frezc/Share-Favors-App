import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import MapsLocalOffer from 'material-ui/lib/svg-icons/maps/local-offer';
import ImageEdit from 'material-ui/lib/svg-icons/image/edit';
import * as Colors from 'material-ui/lib/styles/colors';
import Dialog from 'material-ui/lib/dialog';
import IconButton from 'material-ui/lib/icon-button';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';

function getActions (props) {
  const { type, loading } = props;

  if (loading) {
    return [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={() => {}}
      />
    ];
  }

  switch(type) {
    case types[0]:
      return [
        <IconButton
          style={{ top: 6 }}
        >
          <ImageEdit />
        </IconButton>,
        <FlatButton
          label="Go To"
          primary={true}
          keyboardFocused={true}
          onTouchTap={() => {}}
        />,
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={() => {}}
        />
      ];
    case types[1]:
      return [
        <FlatButton
          label="Ok"
          primary={true}
          onTouchTap={() => {}}
        />,
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={() => {}}
        />
      ];
  }

  return [
    <FlatButton
      label="Cancel"
      secondary={true}
      onTouchTap={() => {}}
    />
  ];
}

function getTitle (props) {
  const { type, loading, link } = props;

  if (loading) {
    return 'Loading...';
  } else if (type === types[1]) {
    return '';
  } else {
    return link.title;
  }
}

function renderLinkDetail (props) {
  return (
    <div className="linkDetail">
      <div className="info"><div className="title">Link</div> <a href="//frezc.com" target="blank">http://12450.com</a></div>
      <div className="info"><div className="title">Description</div> 在在啧啧啧啧啧啧啧啧啧啧啧啧啧啧啧啧啧啧啧啧啧咋</div>
      <div className="info">
        <div className="title">tags</div>
        <div className="tagList">
          <div className="tagContainer">
            <MapsLocalOffer
              style={{ width: 16, height: 16 }}
              color={Colors.teal500}
            />
            <span className="tagText">
              发发呆发呆发呆发呆sa时发生的发生
            </span>
          </div>
          <div className="tagContainer">
            <MapsLocalOffer
              style={{ width: 16, height: 16 }}
              color={Colors.teal500}
            />
            <span className="tagText">
              发发呆发呆发呆发呆
            </span>
          </div>
          <div className="tagContainer">
            <MapsLocalOffer
              style={{ width: 16, height: 16 }}
              color={Colors.teal500}
            />
            <span className="tagText">
              发发呆发呆发呆发呆时发生地方大幅度
            </span>
          </div>
          <div className="tagContainer">
            <MapsLocalOffer
              style={{ width: 16, height: 16 }}
              color={Colors.teal500}
            />
            <span className="tagText">
              发发发呆时发生的发生地方大幅度
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderLinkEditor (props) {
  return (
    <div className="linkEditor">
      <TextField
        floatingLabelText="Title"
        defaultValue="default"
        fullWidth={true}
      />
      <TextField
        floatingLabelText="Url"
        defaultValue="default"
        fullWidth={true}
      />
      <TextField
        floatingLabelText="Description"
        defaultValue="default"
        multiLine={true}
        rowsMax={10}
        fullWidth={true}
      />
    </div>
  );
}

function renderContent (props) {
  const { type, loading } = props;

  if (loading) {
    return (
      <CircularProgress />
    );
  } else if (type === types[1]) {
    return renderLinkEditor(props);
  } else {
    return renderLinkDetail(props);
  }
}

// todo:
function LinkDialog (props) {
  const { visible, loading, error } = props;

  return (
    <Dialog
      title={getTitle(props)}
      actions={getActions(props)}
      open={visible}
      modal={false}
      onRequestClose={() => {}}
      bodyClassName="centerContent"
    >
      {
        renderContent(props)
      }
      {error != '' &&
        <div className="errorText">!! {error}</div>
      }
    </Dialog>
  );
}

const types = ['watch', 'edit'];

LinkDialog.propTypes = {
  type: PropTypes.oneOf(types),
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  error: PropTypes.string,
  link: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      used: PropTypes.number.isRequired
    })).isRequired
  }).isRequired
};

LinkDialog.defaultProps = {
  type: 'watch',
  loading: false,
  visible: false,
  error: ''
};

export default LinkDialog;