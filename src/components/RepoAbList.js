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
const BARHEIGHT = 64;

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
    showPages: [0]                // max length: 4
  };

  // 解决在scroll bar在更新时相应时间而导致ListControlBar显示出错的问题
  activeScrollListener = true;

  // 列表元素对应的节点
  elements = {};

  // call after mount
  /**
   * get the length of whole list (include not rendered)
   */
  calculateListHeight(repoNumAll) {
    const { listContainer } = this.refs;
    if (listContainer) {
      // console.log('list height', repoNumAll)
      let count = 0;
      for (const page of this.state.showPages) {
        count += this.elements[page].length;
      }
      return listContainer.offsetHeight + (repoNumAll - count) * RepoAbstract.defaultHeight;
    }

    return repoNumAll * RepoAbstract.defaultHeight;
  }

  updateHandleHeight({ repoNumAll } = this.props) {
    if (repoNumAll <= 1) {
      this.setState({ handleHeight: 1 });
    } else {
      // 在Loading时不存在
      if (this.refs.listContainer) {
        const handleHeight = ListControlBar.validHandleHeight(window.innerHeight / this.calculateListHeight(repoNumAll));
        console.log('update handle height', window.innerHeight + ", " + this.calculateListHeight(repoNumAll))
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
   * update state.showPage
   */
  updateShowPageOnScroll({ repoNumAll } = this.props) {
    if (this.refs.listContainer) {
      console.log('update show page', this.elements)
      const rect = this.refs.listContainer.getBoundingClientRect();

      let showPages = this.state.showPages;
      const lastPage = showPages[showPages.length - 1];

      // scroll to end of page
      if (lastPage < Math.floor(repoNumAll / PAGE_NUM) && rect.bottom <= window.innerHeight) {
        showPages.push(lastPage + 1);
        this.checkIfNeed(lastPage + 1);
        if (showPages.length > 3) {
          // 清空没用的数组
          console.log('useless page', showPages[0])
          // todo: bug 清空后会马上恢复 可能由于渲染机制问题，现在就不管了
          // this.elements[showPages[0]] = [];
          console.log('after remove', this.elements)
          showPages = showPages.slice(1, showPages.length);

          // 页面中最多90项，所以要滚动到正确的位置
          const rect = this.elements[lastPage][0].getBoundingClientRect();
          console.log('down', rect)
          window.scrollBy(0, rect.top);
        }
        this.setState({ showPages });

      }

      // scroll to top of page
      if (showPages[0] > 0 && rect.top >= 0) {
        this.checkIfNeed(showPages[0] - 1);
        showPages = [showPages[0] - 1, ...showPages];
        if (showPages.length > 3) {
          // this.elements[showPages[3]] = [];
          showPages = showPages.slice(0, 3);
          const rect = this.elements[showPages[2]][0].getBoundingClientRect();
          console.log('up', rect)
          window.scrollBy(0, rect.top);
        }
        this.setState({ showPages });
      }
    }
  }

  /**
   * update state.showPages from change percent
   * bug
   * @param percent [0, 1]
   * @return number scroll offset
   */
  updateShowPageFromPercent(percent) {
    const { repoNumAll } = this.props;
    const totalHeight = this.calculateListHeight(repoNumAll);
    const offset = totalHeight * percent;
    const defaultPageHeight = PAGE_NUM * RepoAbstract.defaultHeight;
    const showPages = this.state.showPages;

    // update state.showPages
    if (this.refs.listContainer) {
      const showTop = showPages[0] * defaultPageHeight;
      const showBottom = showTop + this.refs.listContainer.offsetHeight;
      if (offset <= showTop) {
        // [0, top of show list]
        const page = Math.floor(offset / defaultPageHeight);
        this.updateAddShowPages(page);
      } else if (offset > showBottom) {
        // (bottom of show list, ]
        const page = Math.floor((offset - showBottom) / defaultPageHeight) + showPages[showPages.length - 1] + 1;
        this.updateAddShowPages(page);
      }
    } else {
      const page = Math.floor(offset / defaultPageHeight);
      this.updateAddShowPages(page);
    }
    console.log('updateShowPageFromPercent', offset);
    return (offset - this.state.showPages[0] * defaultPageHeight) + LISTTOP;
  }

  /**
   * scroll to a new page, update the state.showPages.
   * example:
   * newPage = 0, state.showPages = [1, 2, 3], update [0, 1, 2]
   * newPage = 1, ..., update [1, 2, 3]
   * newPage = 4, ..., update [2, 3, 4]
   * newPage = 5, ..., update [5]
   * @param newPage the page add to state.showPages
   * @return array newPages. todo 
   */
  updateAddShowPages(newPage) {
    const { repoNumAll } = this.props;
    const showPages = this.state.showPages;
    if (newPage >= 0 && newPage == showPages[0] - 1) {
      const newPages = [showPages[0] - 1, ...showPages];
      this.setState({
        showPages: newPages.slice(0, 3)
      });
    } else if (newPage <= (repoNumAll - 1) / PAGE_NUM && newPage == showPages[showPages.length - 1] + 1) {
      const newPages = [...showPages, showPages[showPages.length - 1] + 1];
      this.setState({
        showPages: newPages.length > 3 ? newPages.slice(1) : newPages
      });
    } else if (!(newPage in showPages)) {
      this.setState({
        showPages: [parseInt(newPage)]
      });
      console.log('updateAddShowPages', this.state.showPages);
    }
  }

  /**
   * page need to fetch ?
   * @param page
   */
  checkIfNeed(page) {
    const { repoWithRecents, needLoadPage } = this.props;

    if (!repoWithRecents[page]) {
      needLoadPage && needLoadPage(page);
    }
  }

  /**
   * 得到显示的最新的数量索引
   * @param repoNumAll
   * @returns {number}
   */
  getLastShowIndex({ repoNumAll } = this.props) {

    const rect = this.refs.listContainer.getBoundingClientRect();
    if (rect.top + 16 > window.innerHeight) return 0;
    if (rect.bottom < window.innerHeight) return repoNumAll - 1;

    for (let i = 0; i < this.state.showPages.length; i++) {
      const page = this.state.showPages[i];
      const pageEls = this.elements[page];
      for (let j = 0; j < pageEls.length; j++) {
        const rect = pageEls[j].getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom + 16 >= window.innerHeight) {
          console.log('get last show index', page * PAGE_NUM + j)
          return page * PAGE_NUM + j;
        }
      }
    }

    return repoNumAll - 1;
  }

  /**
   * @param repoNumAll
   * @returns {number}
   */
  getPercent({ repoNumAll } = this.props) {
    if (this.refs.listContainer) {
      const totalHeight = this.calculateListHeight(repoNumAll);
      const viewport = window.innerHeight - BARHEIGHT;
      if (totalHeight <= viewport) return 0;

      const rect = this.refs.listContainer.getBoundingClientRect();

      let topPage = this.state.showPages[0];

      const top = Math.min(rect.top - BARHEIGHT, 0);
      const offsetTop = Math.abs(top) + topPage * PAGE_NUM * RepoAbstract.defaultHeight;
      const percent = offsetTop / (totalHeight - viewport);
      return Math.min(1, percent);
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
      if (this.refs.listContainer) {
        this.updateShowPageOnScroll();
      }
      console.log('scroll-before', Date.now() + " " + this.getPercent())
      
      this.setState({
        index: this.getLastShowIndex(),
        percent: this.getPercent()
      });
      
      console.log('scroll-end', Date.now() + ", " + this.state.index)
    }
  };

  // todo
  onDragChange = percent => {
    console.log('onDragChange', percent);
    this.setState({
      percent
    })
  };

  onDoneChange = (percent) => {
    // todo: calculate offset
    // 测试数据 同上
    // const offset = (document.documentElement.scrollHeight - window.innerHeight - LISTTOP) * percent + LISTTOP;
    const offset = this.updateShowPageFromPercent(percent);
    console.log('done change', 'percent: ' + percent + ', offset: ' + offset);

    const scrollStep = (offset - window.scrollY) / 10;
    let step = 0;
    
    window.clearInterval(this.timer);
    this.activeScrollListener = false;
    this.timer = window.setInterval(() => {
      step++;
      if (step > 10) {
        window.clearInterval(this.timer);
        this.activeScrollListener = true;
        // 更新到精确的index
        this.updateIndex();
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 17);
    
    this.setState({
      percent,
      index: this.getLastShowIndex()
    });
  };

  componentDidMount() {
    window && window.addEventListener('resize', this.onWindowResize);
    window && window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onWindowResize);
    window && window.removeEventListener('scroll', this.scrollListener);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.repoNumAll != this.props.repoNumAll || newProps.repoWithRecents != this.props.repoWithRecents) {
      console.log('receive props', this.props);
      console.log('receive props', newProps);
      this.updateShowPageOnScroll(newProps);
      setTimeout(() => {
        this.updateHandleHeight();
        this.updateIndex();
        this.updatePercent();
      }, 9);
    }
  }

  /**
   * construct one page list
   */
  constructPageList(pageIndex, page, num) {
    let list = [];
    if (!this.elements[pageIndex]) this.elements[pageIndex] = [];
    for(let i = 0; i < num; i++) {
      const key = (pageIndex * PAGE_NUM + i) % (PAGE_NUM * 3);
      if (page) {
        list.push(
          <RepoAbstract
            key={key}
            rootRef={r => {this.elements[pageIndex][i] = r; console.log('get ref', pageIndex)}}
            className="item"
            repository={page[i].repository}
            recentItems={page[i].recentItems}
            onExpandChange={this.abExpandChange}
          />
        );
      } else {
        list.push(
          <RepoAbstract
            key={key}
            rootRef={r => {this.elements[pageIndex][i] = r; console.log('get ref', pageIndex)}}
            className="item"
            loading
            onExpandChange={this.abExpandChange}
          />
        );
      }
    }
    return list;
  }

  showRepoAbList() {
    const { repoWithRecents, repoNumAll } = this.props;

    this.listContronl = (
      <ListControlBar
        className="listController"
        sum={repoNumAll}
        percent={this.state.percent}
        handleHeight={this.state.handleHeight}
        currentIndex={this.state.index + 1}
        description={'This is Repos'}
        scrollOffset={LISTTOP}
        onDragChange={this.onDragChange}
        onDoneChange={this.onDoneChange}
      />
    );

    console.log('state', this.state)

    return (
      <div
        ref="listContainer"
      >
        {repoNumAll > 0 &&
          this.listContronl
        }
        {repoNumAll > 0 ?
          this.state.showPages.map(pageIndex =>
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
    console.log('render', Date.now() + " " + this.state.showPages)

    const { filters, onFilterChange,  loading,  dispatch } = this.props;
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
