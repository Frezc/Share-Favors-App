import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Table from 'material-ui/lib/table/table';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import ActionVisibilityOff from 'material-ui/lib/svg-icons/action/visibility-off';
import ActionVisibility from 'material-ui/lib/svg-icons/action/visibility';
import ToggleStar from 'material-ui/lib/svg-icons/toggle/star';
import ActionDateRange from 'material-ui/lib/svg-icons/action/date-range';
import MapsLocalOffer from 'material-ui/lib/svg-icons/maps/local-offer';
import Subheader from 'material-ui/lib/Subheader';
import Divider from 'material-ui/lib/divider';
import FileFolderShared from 'material-ui/lib/svg-icons/file/folder-shared';
import ContentLink from 'material-ui/lib/svg-icons/content/link';
import * as Colors from 'material-ui/lib/styles/colors';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

function getRootClassName (className) {
  return 'repoAbstract ' + className;
}

function RepositoryAbstract (props) {
  const { actions, className, style, repoId, repositories, links, tags } = props;

  const repository = repositories[repoId];
  let linkNum = 0;
  let repoNum = 0;

  repository.items.map(item => {
    if (item.type == 'repo') {
      repoNum++;
    } else {
      linkNum++;
    }
  })

  return (
    <div 
      className={getRootClassName(className)}
      style={style}
    >
      <Card>
        <CardHeader
          actAsExpander={false}
          showExpandableButton={true}
        >
          <div className="repoTitle">
            <a onClick={e => {e.preventDefault();e.stopPropagation();}}>
              {repository.creatorName}
            </a>
            /
            <a onClick={e => {e.preventDefault();e.stopPropagation();}}>
              {repository.name}
            </a>
          </div>
          <div className="repoSubTitle">
            <ToggleStar
              className="starIcon"
              style={styles.subtitleIcon}
              color={Colors.grey500}
            />
            <span>
              {repository.stars}
            </span>
            {
              repository.status == 0 ?
                <ActionVisibilityOff
                  className="visibilityIcon"
                  style={styles.subtitleIcon}
                  color={Colors.grey500}
                />
                :
                <ActionVisibility
                  className="visibilityIcon"
                  style={styles.subtitleIcon}
                  color={Colors.grey500}
                />
            }
            <ActionDateRange
              className="dateIcon"
              style={styles.subtitleIcon}
              color={Colors.grey500}
            />
            <span
              className="dateText">
              {repository.created_at.slice(0, 10)}
            </span>
            <ContentLink
              className="linkIcon"
              style={styles.subtitleIcon}
              color={Colors.grey500}
            />
            <span
              className="linkText">
              {linkNum}
            </span>
            <FileFolderShared
              className="folderIcon"
              style={styles.subtitleIcon}
              color={Colors.grey500}
            />
            <span
              className="folderText">
              {repoNum}
            </span>
          </div>
        </CardHeader>
        <CardText expandable={true}>
          <Divider />
          <Subheader>Description</Subheader>
          <div className="description">
            {repository.description}
          </div>
          <Divider />
          <Subheader>Tags</Subheader>
          <div className="tagList">
            {repository.tags.map(tagId => 
              <div 
                className="tagContainer"
                key={tagId}
              >
                <MapsLocalOffer
                  style={{ width: 16, height: 16 }}
                  color={Colors.teal500}
                />
                <span className="tagText">
                  {tags[tagId].text}
                </span>
              </div>
            )}
          </div>
          <Divider />
          <Subheader>Recent Updated Items</Subheader>
          <Table className="abstractTable">
            <TableBody
              displayRowCheckbox={false}
              selectable={false}>
              <TableRow>
                <TableRowColumn
                  style={{ width: 8 }}>
                  <ContentLink
                    style={styles.columnIcon}
                    color={Colors.grey900}
                  />
                </TableRowColumn>
                <TableRowColumn
                  className="columnName">
                  <a href="#">这是很黄很暴力的链接字数补丁字数补丁字数补丁</a>
                </TableRowColumn>
                <TableRowColumn
                  className="columnDate">
                  2016-03-19
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn
                  style={{ width: 8 }}>
                  <FileFolderShared
                    style={styles.columnIcon}
                    color={Colors.grey900}
                  />
                </TableRowColumn>
                <TableRowColumn
                  className="columnName">
                  <a href="#">其他库</a>
                </TableRowColumn>
                <TableRowColumn
                  className="columnDate">
                  2016-03-19
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn
                  style={{ width: 8 }}>
                  <ContentLink
                    style={styles.columnIcon}
                    color={Colors.grey900}
                  />
                </TableRowColumn>
                <TableRowColumn
                  className="columnName">
                  <a href="#">这是很黄很暴力的链接字数补丁字数补丁字数补丁</a>
                </TableRowColumn>
                <TableRowColumn
                  className="columnDate">
                  2016-03-19
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardText>
        { actions.length > 0 &&
          <CardActions expandable={false}>
            { actions.map((action, i) => 
              <FlatButton 
                  key={action.label} 
                  label={action.label} 
                  onTouchTap={action.onTap}
                  primary={i % 2 == 0}
                  secondary={i % 2 == 1}
              />
            )}
          </CardActions>
        }
      </Card>
    </div>
  );
}

RepositoryAbstract.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onTap: PropTypes.func
  })),
  className: PropTypes.string,
  style: PropTypes.object,
  repoId: PropTypes.number.isRequired,
  repositories: PropTypes.object.isRequired,
  links: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired
};

RepositoryAbstract.defaultProps = {
  actions: [],
  className: '',
  style: {}
}

const styles = {
  subtitleIcon: {
    width: 18, 
    height: 18
  },
  columnIcon: {
    width: 24,
    height: 24
  }
}

export default RepositoryAbstract;
