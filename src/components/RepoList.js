import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Table from 'material-ui/lib/table/table';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import FileFolderShared from 'material-ui/lib/svg-icons/file/folder-shared';
import ContentLink from 'material-ui/lib/svg-icons/content/link';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
import * as Colors from 'material-ui/lib/styles/colors';

function renderRows () {
  let arr = [];
  for (let i = 0; i < 98; i++) {
    arr.push(
      <TableRow key={i}>
        <TableRowColumn
          style={{ width: 8 }}>
          <ContentLink
            style={styles.columnIcon}
            color={Colors.grey900}
          />
        </TableRowColumn>
        <TableRowColumn
          className="columnName">
          <a href="#">{'index: ' + (i+1)} 这是很黄很暴力的链接字数补丁字数补丁字数补丁</a>
        </TableRowColumn>
        <TableRowColumn
          className="columnDate">
          a hour ago
        </TableRowColumn>
        <TableRowColumn
          className="columnMore">
          <NavigationMoreVert 
            style={styles.columnIcon}
            color={Colors.grey700}
          />
        </TableRowColumn>
      </TableRow>
    );
  }

  return arr;
}

function RepoList (props) {
  const { rootRef } = props;

  return (
    <div 
      className="repoList"
      ref={ref => {
        rootRef && rootRef(ref);
      }}
    >
      <Card>
        <CardText>
          <Table
            selectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              style={{ 
                borderBottom: 0 //fix table header border-bottom bug
            }}>
              <TableRow
                style={{ 
                  borderBottom: 0 //same
              }}>
                <TableHeaderColumn
                  style={{ width: 8 }}>
                  Type
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Title
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={{ width: 72 }}>
                  Updated At
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={{ width: 12 }}>
                  More
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              { 
                renderRows()
              }
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
                  <a href="#">这是其他库</a>
                </TableRowColumn>
                <TableRowColumn
                  className="columnDate">
                  2016-03-19
                </TableRowColumn>
                <TableRowColumn
                  className="columnMore">
                  <NavigationMoreVert 
                    style={styles.columnIcon}
                    color={Colors.grey700}
                  />
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
                  <a href="#">依旧是很黄很暴力的链接</a>
                </TableRowColumn>
                <TableRowColumn
                  className="columnDate">
                  2016-03-19
                </TableRowColumn>
                <TableRowColumn
                  className="columnMore">
                  <NavigationMoreVert 
                    style={styles.columnIcon}
                    color={Colors.grey700}
                  />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardText>
      </Card>
    </div>
  );
}

RepoList.propTypes = {
  rootRef: PropTypes.func
};

const styles = {
  subtitleIcon: {
    width: 18, 
    height: 18
  },
  columnIcon: {
    width: 24,
    height: 24,
    cursor: 'pointer'
  }
}

export default RepoList;