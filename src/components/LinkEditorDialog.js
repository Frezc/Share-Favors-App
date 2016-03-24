import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import MapsLocalOffer from 'material-ui/lib/svg-icons/maps/local-offer';
import * as Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';

function LinkEditorDialog(props) {
  const dialogActions = [
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
    
  return (
    <Dialog
      actions={dialogActions}
      open={true}
      modal={false}
      onRequestClose={() => {}}
    >
      
      <div className="linkEditor">
        <TextField
          floatingLabelText="Title"
          defaultValue="default"
          style={{ width: '100%' }}
        />
        <TextField
          floatingLabelText="Url"
          defaultValue="default"
          style={{ width: '100%' }}
        />
        <TextField
          floatingLabelText="description"
          defaultValue="default"
          multiLine={true}
          rowsMax={10}
          style={{ width: '100%' }}
        />
      </div>
    </Dialog>
  );
}

export default LinkEditorDialog;
