import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import MapsLocalOffer from 'material-ui/lib/svg-icons/maps/local-offer';
import ImageEdit from 'material-ui/lib/svg-icons/image/edit';
import * as Colors from 'material-ui/lib/styles/colors';
import Dialog from 'material-ui/lib/dialog';
import IconButton from 'material-ui/lib/icon-button';

function LinkDetailDialog (props) {

  
  const dialogActions = [
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
    
  return (
    <Dialog
      title="这是标题啊这是标题啊这是标题啊这是标题啊这是标题啊"
      actions={dialogActions}
      open={true}
      modal={false}
      onRequestClose={() => {
        this.setState({ showDialog: false })
      }}
    >
      
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
    </Dialog>
  );
}

export default LinkDetailDialog;