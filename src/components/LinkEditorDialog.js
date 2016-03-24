import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import MapsLocalOffer from 'material-ui/lib/svg-icons/maps/local-offer';
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
    </Dialog>
  );
}

export default LinkEditorDialog;
