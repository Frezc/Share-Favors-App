import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import RepoAbstract from './../components/RepositoryAbstract';
import ListFilter from '../components/ListFilter';
import NoResult from './NoResult';
import ContentMask from './ContentMask';
import ListControlBar from '../components/ListControlBar';
import { PAGE_NUM } from '../constants';
import { getPageItemsNumber } from '../helpers';

const LISTTOP = 132;

class RepoAbList extends React.Component {
  
  static propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    repoWithRecents: PropTypes.object,
    repoNumAll: PropTypes.number,
    // repoWithRecents: PropTypes.arrayOf(PropTypes.shape({
    //   repository: PropTypes.shape({
    //     id: PropTypes.number.isRequired
    //   }).isRequired,
    //   recentItems: PropTypes.array
    // })),
    onFilterChange: PropTypes.func,
    needLoadPage: PropTypes.func
  };
  
  static defaultProps = {
    filters: [],
    repoWithRecents: {},
    loading: false,
    repoNumAll: 0
  };

  state = {
    index: 0,                  // [0, repoNumAll - 1]
    percent: 0,
    handleHeight: 1,
    showList: [],               // the elements visible in list
    showPage: [0]                // todo
  };

  showPage = 0;                // 当前的页数

  // 解决在scroll bar在更新时相应时间而导致ListControlBar显示出错的问题
  activeScrollListener = true;

  // 列表元素对应的节点
  elements = [];
  
  constructPageList(pageIndex, page, num) {
    const { needLoadPage } = this.props;
    let list = [];
    this.elements = [];
    for(let i = 0; i < num; i++) {
      const key = (pageIndex * 50 + i) % 150;
      if (page) {
        list.push(
          <RepoAbstract
            key={key}
            rootRef={r => this.elements.push(r)}
            className="item"
            repository={page[i].repository}
            recentItems={page[i].recentItems}
            onExpandChange={this.abExpandChange}
          />
        );
      } else {
        needLoadPage && needLoadPage(pageIndex);
        list.push(
          <RepoAbstract
            key={key}
            rootRef={r => this.elements.push(r)}
            className="item"
            loading
            onExpandChange={this.abExpandChange}
          />
        );
      }
    }
    return list;
  }

  /**
   * 更新显示列表
   *
   * @param repoWithRecents
   * @param repoNumAll
   */
  updateShowList({ repoWithRecents, repoNumAll } = this.props) {
    const page = this.getCurrentPage();

    let up = [];
    let down = [];
    if (this.refs.listContainer) {
      // after mount
      window.listContainer = this.refs.listContainer;

      const listContainer = this.refs.listContainer;

      /* refactor
      if (page > 0 && listContainer.getBoundingClientRect().top >= 0) {
        up = this.constructPageList(page - 1, repoWithRecents[page - 1], getPageItemsNumber(repoNumAll, page - 1, PAGE_NUM));
      }
      if (page < repoNumAll / PAGE_NUM && listContainer.getBoundingClientRect().bottom <= window.innerHeight) {
        down = this.constructPageList(page + 1, repoWithRecents[page + 1], getPageItemsNumber(repoNumAll, page + 1, PAGE_NUM));
      }
      */


    }

    const mid = this.constructPageList(page, repoWithRecents[page], getPageItemsNumber(repoNumAll, page, PAGE_NUM));

    this.setState({
      showList: Array.prototype.concat(up, mid, down)
    });
  }

  // call after mount
  /**
   * get the length of whole list (include not rendered)
   */
  calculateListHeight(repoNumAll) {
    const { listContainer } = this.refs;
    if (listContainer) {
      // console.log('list height', repoNumAll)
      return listContainer.offsetHeight + (repoNumAll - this.state.showList.length) * RepoAbstract.defaultHeight;
    }

    return 1;
  }

  updateHandleHeight({ repoNumAll } = this.props) {
    if (repoNumAll <= 1) {
      this.setState({ handleHeight: 1 });
    } else {
      // 在Loading时不存在
      if (this.refs.listContainer) {
        const handleHeight = ListControlBar.validHandleHeight(window.innerHeight / this.calculateListHeight(repoNumAll));
        // console.log('update handle height', handleHeight)
        this.setState({ handleHeight });
      } else {
        const handleHeight = ListControlBar.validHandleHeight(window.innerHeight / (RepoAbstract.defaultHeight * repoNumAll));
        this.setState({ handleHeight });
      }
    }
  }

  /**
   * update percent
   */
  updatePercent(newProps) {
    const percent = this.getPercent(newProps);
    this.setState({ percent });
  }

  /**
   * wait for view updated
   */
  updateIndex(newProps) {
    this.setState({
      index: this.getLastShowIndex(newProps)
    })
  }

  /**
   * 得到并更新当前的页数
   * before render update
   */
  getCurrentPage({ repoNumAll } = this.props) {
    if (this.refs.listContainer) {
      if (this.elements.length > PAGE_NUM) {
        const rect = this.elements[PAGE_NUM].getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          this.showPage -= 1;
        }
      }
      const listRect = this.refs.listContainer.getBoundingClientRect();
      if (listRect.top >= 0 && this.showPage > 0) {
        this.showPage -= 1;
      }
      if (listRect.bottom <= window.innerHeight && this.showPage < repoNumAll / PAGE_NUM) {
        this.showPage += 1;
      }
    }
    return this.showPage;
  }

  /**
   * 得到显示的最新的数量索引，只用于显示
   * @param repoNumAll
   * @returns {number}
   */
  getLastShowIndex({ repoNumAll } = this.props) {
    let startIndex = 0;
    /*
    if (this.elements.length > PAGE_NUM) {
      startIndex = PAGE_NUM;
    }
    */
    console.log('get last show index', this.elements)
    for(let i = startIndex; i < this.elements.length; i++) {
      const rect = this.elements[i].getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom + 16 >= window.innerHeight) {
        return this.showPage * PAGE_NUM + i;
      }
    }

    return repoNumAll - 1;
  }

  getPercent({ repoNumAll } = this.props) {
    if (this.refs.listContainer) {
      const totalHeight = this.refs.listContainer.offsetHeight
        + (repoNumAll - this.state.showList.length) * RepoAbstract.defaultHeight;
      const rect = this.refs.listContainer.getBoundingClientRect();
      let topPage = this.showPage;
      if (this.state.showList.length > PAGE_NUM) {
        topPage -= 1;
      }
      const top = Math.min(rect.top, 0);
      const offsetTop = Math.abs(top) + topPage * PAGE_NUM * RepoAbstract.defaultHeight;
      return offsetTop / (totalHeight - window.innerHeight);
    }

    return 0;
  }

  abExpandChange = isExpanded => {
    // 由于Card的onExpandChange方法是在改变state，即更新前调用的，
    // 所以这里设置延时来等待重新渲染（当然只能算取巧的方案）
    setTimeout(() => {
      this.updateHandleHeight();
      this.updateIndex();
      this.updatePercent();
    }, 9);
  };

  
  onWindowResize = () => {
    this.updateHandleHeight();
    this.updateIndex();
    this.updatePercent();
  };

  scrollListener = () => {
    if (this.activeScrollListener) {
      /*
       const { scrollOffset } = this.props;
       let percent = (window.scrollY - scrollOffset) / (document.documentElement.scrollHeight - window.innerHeight - scrollOffset);
       // console.log('percent', percent)

       percent = Math.min(Math.max(0, percent), 1);
       if (percent != this.state.percent) {
       this.setState({ percent });
       }
       */

      const { index, showList } = this.state;
      const offsetIndex = index % PAGE_NUM;

      if (this.elements.length > PAGE_NUM) {
        window.com = this.elements[PAGE_NUM + offsetIndex];
      } else {
        window.com = this.elements[offsetIndex];
      }

      if (this.refs.listContainer) {
        const rect = this.refs.listContainer.getBoundingClientRect();

        if (rect.bottom <= window.innerHeight || (rect.top >= 0 && this.showPage != 0)) {
          this.updateShowList();
        }
      }

      // console.log('onscroll', this.getPercent())
      this.setState({
        index: this.getLastShowIndex(),
        percent: this.getPercent()
      })
    }
  };

  onDoneChange = percent => {
    // todo: calculate offset
    // 测试数据 同上
    const offset = (document.documentElement.scrollHeight - window.innerHeight - LISTTOP) * percent + LISTTOP;

    const scrollStep = (offset - window.scrollY) / 10;
    let step = 0;
    
    window.clearInterval(this.timer);
    this.activeScrollListener = false;
    this.timer = window.setInterval(() => {
      step++;
      if (step > 10) {
        window.clearInterval(this.timer);
        this.activeScrollListener = true;
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 17);
    
    this.setState({ percent });
  };

  componentDidMount() {
    this.updateHandleHeight();
    window && window.addEventListener('resize', this.onWindowResize);
    window && window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onWindowResize);
    window && window.removeEventListener('scroll', this.scrollListener);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.repoNumAll != this.props.repoNumAll || newProps.repoWithRecents != this.props.repoWithRecents) {
      this.updateShowList(newProps);
      setTimeout(() => {
        this.updateHandleHeight();
        this.updateIndex();
        this.updatePercent();
      }, 9);
    }
  }

  showRepoAbList() {
    const { repoWithRecents, repoNumAll } = this.props;
    return (
      <div
        ref="listContainer"
      >
        <ListControlBar
          className="listController"
          sum={repoNumAll}
          percent={this.state.percent}
          handleHeight={this.state.handleHeight}
          currentIndex={this.state.index + 1}
          description={'This is Repos'}
          scrollOffset={LISTTOP}
          onDoneChange={this.onDoneChange}
          onDragChange={percent => {
            // 在这里更新percent效率比较低
            // this.setState({ percent })
          }}
        />
        {repoNumAll > 0 ?

          // todo
          this.state.showPage.map(pageIndex =>
            this.constructPageList(pageIndex, repoWithRecents[pageIndex],
              getPageItemsNumber(repoNumAll, pageIndex, PAGE_NUM))
          )
          :
          <NoResult
            msg="No Repositories"
          />
        }
      </div>

    );
  }

  render() {

    const { filters, onFilterChange, repoWithRecents, loading, repoNumAll, dispatch } = this.props;
    const { pathname, query } = this.props.location;
    // console.log('loading', loading)
    return (
      <div
        className="repoAbstract"
      >
        {filters.length > 0 &&
        <ListFilter
          filters={filters}
          activeFilter={query.filter}
          onFilterChange={(index, filter) => {
            dispatch(push({
              pathname: pathname,
              query: Object.assign({}, query, {
                filter: filter.toLowerCase()
              })
            }));

            onFilterChange && onFilterChange(index, filter)
          }}
        />
        }

        <ContentMask
          loading={loading}
          error=""
        />

        {!loading &&
          this.showRepoAbList()
        }

      </div>
    );
  }

}

export default RepoAbList;
