import React, { PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const styles = {
  hintStyle: {
    fontSize: 20
  },
  inputStyle: {
    fontSize: 20
  }
};

const types = ['repo', 'link', 'tag', 'user'];


class SearchPage extends React.Component {

  checkPath(pathname) {
    const reg = /\/search\/(\w+)/i;
    const re = reg.exec(pathname);

    if (re[1]) {
      return Math.max(types.indexOf(re[1].toLowerCase()), 0);
    } else {
      return 0;
    }
  }

  getSearchFieldCSSName(index) {
    if (index) {
      return "searchField center";
    } else {
      return 'searchField';
    }
  }

  // click the type tab
  onTypeChange(index) {
    const { dispatch } = this.props;

    if (this.checkPath(this.props.location.pathname) != index) {
      dispatch(push({
        pathname: `/search/${types[index]}`
      }));
    }
  }

  renderResult() {
    // console.log(this.props)
    let index = this.checkPath(this.props.location.pathname);

    return (
      <div
        className="resultContainer"
      >
        <div
          className="resultType"
        >
          {
            types.map((type, i) =>
              <div
                key={type}
                onTouchTap={() => this.onTypeChange(i)}
              >
                {type}
              </div>
            )
          }
          <div
            className="typeIndicator"
            style={{
              left: `${index * 25}%`
            }}
          ></div>
        </div>
        <div
          className="resultContent"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
  
  render() {
    // 是否在搜索的主页
    const index = this.props.children == null;

    return (
      <div
        className="searchPage"
      >
        <div
          className={this.getSearchFieldCSSName(index)}
        >
          Search
          <TextField
            className="searchInput"
            name="searchPageInput"
            hintText="Something"
            hintStyle={styles.hintStyle}
            inputStyle={styles.inputStyle}
          />
          ?
        </div>
        {index ||
          this.renderResult()
        }
      </div>
    );
  }
}

function select(state, ownProps) {
  return ownProps;
}

export default connect(select)(SearchPage);
