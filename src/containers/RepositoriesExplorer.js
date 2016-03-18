import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Table from 'material-ui/lib/table/table';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import ActionVisibilityOff from 'material-ui/lib/svg-icons/action/visibility-off';
import ToggleStar from 'material-ui/lib/svg-icons/toggle/star';
import ActionDateRange from 'material-ui/lib/svg-icons/action/date-range';
import MapsLocalOffer from 'material-ui/lib/svg-icons/maps/local-offer';
import Subheader from 'material-ui/lib/Subheader';
import Divider from 'material-ui/lib/divider';
import FileFolderShared from 'material-ui/lib/svg-icons/file/folder-shared';
import ContentLink from 'material-ui/lib/svg-icons/content/link';
import * as Colors from 'material-ui/lib/styles/colors';

function RepositoriesExplorer (props) {

  return (
    <div className="repo">
     <Card>
      <CardHeader
        actAsExpander={false}
        showExpandableButton={true}
      >
        <div className="repoTitle">
          <a onClick={e => {e.preventDefault();e.stopPropagation();}}>
            Frezc
          </a>
          /
          <a onClick={e => {e.preventDefault();e.stopPropagation();}}>
            MyFavors
          </a>
        </div>
        <div className="repoSubTitle">
          <ToggleStar
            className="starIcon"
            style={styles.subtitleIcon}
            color={Colors.grey500}
          />
          <span>
            12450
          </span>
          <ActionVisibilityOff
            className="visibilityIcon"
            style={styles.subtitleIcon}
            color={Colors.grey500}
          />
          <ActionDateRange
            className="dateIcon"
            style={styles.subtitleIcon}
            color={Colors.grey500}
          />
          <span
            className="dateText">
            2015-01-12
          </span>
          <ContentLink
            className="linkIcon"
            style={styles.subtitleIcon}
            color={Colors.grey500}
          />
          <span
            className="linkText">
            76
          </span>
          <FileFolderShared
            className="folderIcon"
            style={styles.subtitleIcon}
            color={Colors.grey500}
          />
          <span
            className="folderText">
            15
          </span>
        </div>
      </CardHeader>
      <CardText expandable={true}>
        <Divider />
        <Subheader>Description</Subheader>
        <div className="description">
          This is a very simple link repository.<br />
          If You Like it, please give me a star.
        </div>
        <Divider />
        <Subheader>Tags</Subheader>
        <div className="tagList">
          <div className="tagContainer">
            <MapsLocalOffer
              style={{ width: 16, height: 16 }}
              color={Colors.teal500}
            />
            <span className="tagText">
              发发呆发呆发呆发呆sa时发生的发生地方大幅度dddDd多大的第三代
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
        <Divider />
        <Subheader>Recent Updated Items</Subheader>
        <Table>
          <TableBody>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </CardText>
    </Card>
    </div>
  );
}

const styles = {
  subtitleIcon: {
    width: 18, 
    height: 18
  }
}

export default RepositoriesExplorer;