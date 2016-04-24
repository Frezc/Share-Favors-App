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
import { grey900, grey500, teal500 } from 'material-ui/lib/styles/colors';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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

class RepositoryAbstract extends React.Component {

  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      onTap: PropTypes.func
    })),
    className: PropTypes.string,
    style: PropTypes.object,
    repository: PropTypes.shape({
      title: PropTypes.string.isRequired,
      creator_id: PropTypes.number.isRequired,
      creator_name: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
      stars: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        used: PropTypes.number.isRequired
      })).isRequired,
      description: PropTypes.string.isRequired,
      repoNum: PropTypes.number.isRequired,
      linkNum: PropTypes.number.isRequired
    }),
    recentItems: PropTypes.array,
    loading: PropTypes.bool,
    onExpandChange: PropTypes.func,
    rootRef: PropTypes.func
  };

  static defaultProps = {
    actions: [],
    className: '',
    style: {},
    recentItems: [],
    loading: false
  };

  static defaultHeight = 88;

  getRootClassName (className) {
    return 'repoAbstract ' + className;
  }

  showRencentBlock (props) {
    const { recentItems } = props;

    return recentItems && recentItems.length > 0;
  }

  renderRecentItems (recentItems) {
    // console.log('recentItems', recentItems)
    return (
      <div
        className="recentItems"
      >
        <Divider />
        <Subheader>Recent Updated Items</Subheader>
        <Table className="abstractTable">
          <TableBody
            displayRowCheckbox={false}
            selectable={false}>
            {recentItems.map(item =>
              <TableRow
                key={item.type == 0 ?
                item.repository.id
                :
                item.link.id
              }
              >
                <TableRowColumn
                  style={{ width: 8 }}>
                  {item.type == 0 ?
                    <FileFolderShared
                      style={styles.columnIcon}
                      color={grey900}
                    />
                    :
                    <ContentLink
                      style={styles.columnIcon}
                      color={grey900}
                    />
                  }
                </TableRowColumn>
                <TableRowColumn
                  className="columnName">
                  <a href="#">
                    {item.type == 0 ?
                      item.repository.title
                      :
                      item.link.title
                    }
                  </a>
                </TableRowColumn>
                <TableRowColumn
                  className="columnDate">
                  {item.created_at.slice(0, 10)}
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  renderLoading(props) {
    const { className, style, onExpandChange, rootRef } = props;

    return (
      <div
        className={this.getRootClassName(className)}
        style={style}
        ref={rootRef}
      >
        <Card
          onExpandChange={onExpandChange}
        >
          <CardHeader
            actAsExpander={false}
            showExpandableButton={false}
          >
            <div className="repoTitle">
              <a>
                Loading...
              </a>
            </div>
          </CardHeader>
          <CardText expandable={true}>
            <Divider />
            <Subheader>Description</Subheader>
            <div className="description"></div>
            <Divider />
            <Subheader>Tags</Subheader>
            <div className="tagList"></div>
          </CardText>
        </Card>
      </div>
    );
  }

  renderContent(props) {
    const { actions, className, style, repository, recentItems, onExpandChange, rootRef } = props;

    return (
      <div
        className={this.getRootClassName(className)}
        style={style}
        ref={rootRef}
      >
        <Card
          onExpandChange={onExpandChange}
        >
          <CardHeader
            actAsExpander={false}
            showExpandableButton={true}
          >
            <div className="repoTitle">
              <Link
                to={`/user/${repository.creator_id}`}
              >
                {repository.creator_name}
              </Link>
              /
              <a onClick={e => {e.preventDefault();e.stopPropagation();}}>
                {repository.title}
              </a>
            </div>
            <div className="repoSubTitle">
              <ToggleStar
                className="starIcon"
                style={styles.subtitleIcon}
                color={grey500}
              />
            <span>
              {repository.stars}
            </span>
              {
                repository.status == 0 ?
                  <ActionVisibilityOff
                    className="visibilityIcon"
                    style={styles.subtitleIcon}
                    color={grey500}
                  />
                  :
                  <ActionVisibility
                    className="visibilityIcon"
                    style={styles.subtitleIcon}
                    color={grey500}
                  />
              }
              <ActionDateRange
                className="dateIcon"
                style={styles.subtitleIcon}
                color={grey500}
              />
            <span
              className="dateText">
              {repository.created_at.slice(0, 10)}
            </span>
              <ContentLink
                className="linkIcon"
                style={styles.subtitleIcon}
                color={grey500}
              />
            <span
              className="linkText">
              {repository.repoNum}
            </span>
              <FileFolderShared
                className="folderIcon"
                style={styles.subtitleIcon}
                color={grey500}
              />
            <span
              className="folderText">
              {repository.linkNum}
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
              {repository.tags.map(tag =>
                <div
                  className="tagContainer"
                  key={tag.id}
                >
                  <MapsLocalOffer
                    style={{ width: 16, height: 16 }}
                    color={teal500}
                  />
                <span className="tagText">
                  {tag.text}
                </span>
                </div>
              )}
            </div>
            {this.showRencentBlock(props) &&
              this.renderRecentItems(recentItems)
            }
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

  // rootRef会导致每次都更新
  // shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('pre', this.props)
    // console.log('next', nextProps)
    // console.log(PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState))
    // todo: 实现自己的Compare函数
    return this.props.loading != nextProps.loading;
  } 

  render() {
    console.log('repo ab', Date.now())
    
    const { loading } = this.props;
    if (loading) {
      return this.renderLoading(this.props);
    } else {
      return this.renderContent(this.props);
    }
  }
}

export default RepositoryAbstract;
