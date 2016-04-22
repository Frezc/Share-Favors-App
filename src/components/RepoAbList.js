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

// 列表元素对应的节点 elements[0][0~29]
let elements = {};

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

  showPage = 0;                // 当前的页数

  // 解决在scroll bar在更新时相应时间而导致ListControlBar显示出错的问题
  activeScrollListener = true;

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
   * update state.showPage
   */
  updateShowPage({ repoNumAll } = this.props) {
    if (this.refs.listContainer) {
      console.log('update show page', elements)
      const rect = this.refs.listContainer.getBoundingClientRect();

      let showPages = this.state.showPages;
      const lastPage = showPages[showPages.length - 1];
      if (lastPage < Math.floor(repoNumAll / PAGE_NUM) && rect.bottom <= window.innerHeight) {
        showPages.push(lastPage + 1);
        this.checkIfNeed(lastPage + 1);
        if (showPages.length > 3) {
          showPages = showPages.slice(1, showPages.length);

          // 页面中最多90项，所以要滚动到正确的位置
          const rect = elements[lastPage][0].getBoundingClientRect();
          console.log('down', rect)
          window.scrollBy(0, rect.top);
        }
        this.setState({ showPages });

      }
      if (showPages[0] > 0 && rect.top >= 0) {
        this.checkIfNeed(showPages[0] - 1);
        showPages = [showPages[0] - 1, ...showPages];
        if (showPages.length > 3) {
          showPages = showPages.slice(0, 3);
          const rect = elements[showPages[2]][0].getBoundingClientRect();
          console.log('up', rect)
          window.scrollBy(0, rect.top);
        }
        this.setState({ showPages });
      }
    }
  }

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
    console.log('get last show index', elements)

    for (let i = 0; i < this.state.showPages.length; i++) {
      const page = this.state.showPages[i];
      const pageEls = elements[page];
      for (let j = 0; j < pageEls.length; j++) {
        const rect = pageEls[j].getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom + 16 >= window.innerHeight) {
          return page * PAGE_NUM + j;
        }
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

      if (this.refs.listContainer) {
        /*
        const rect = this.refs.listContainer.getBoundingClientRect();

        if (rect.bottom <= window.innerHeight || (rect.top >= 0 && this.showPage != 0)) {
          this.updateShowList();
        }
        */

        this.updateShowPage();
      }

      // console.log('onscroll', this.getPercent())
      // this.setState({
      //   index: this.getLastShowIndex(),
      //   percent: this.getPercent()
      // })
      
      console.log('scroll-before', Date.now())
      
      this.setState({
        currentIndex: this.getLastShowIndex(),
        percent: this.getPercent()
      });
      
      console.log('scroll-end', Date.now())
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
    // this.updateHandleHeight();
    window && window.addEventListener('resize', this.onWindowResize);
    window && window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onWindowResize);
    window && window.removeEventListener('scroll', this.scrollListener);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.repoNumAll != this.props.repoNumAll || newProps.repoWithRecents != this.props.repoWithRecents) {
      // this.updateShowList(newProps);
      this.updateShowPage(newProps);
      setTimeout(() => {
        this.updateHandleHeight();
        this.updateIndex();
        this.updatePercent();
      }, 9);
    }
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
        onDoneChange={this.onDoneChange}
        onDragChange={percent => {
            // 在这里更新percent效率比较低
            // this.setState({ percent })
          }}
      />
    );

    return (
      <div
        ref="listContainer"
      >
        {this.listContronl}
        {repoNumAll > 0 ?
          <AbList
            showPages={this.state.showPages}
            repoWithRecents={repoWithRecents}
            repoNumAll={repoNumAll}
            abExpandChange={this.abExpandChange}
          />
          :
          <NoResult
            msg="No Repositories"
          />
        }
      </div>

    );
  }

  render() {
    console.log('render', Date.now())

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

class AbList extends React.Component {

  static propTypes = {
    showPages: PropTypes.array.isRequired,
    repoWithRecents: PropTypes.object,
    repoNumAll: PropTypes.number,
    abExpandChange: PropTypes.func
  };

  static defaultProps = {
    repoWithRecents: {},
    repoNumAll: 0
  };

  constructPageList(pageIndex, page, num) {
    let list = [];
    elements[pageIndex] = [];
    for(let i = 0; i < num; i++) {
      const key = (pageIndex * PAGE_NUM + i) % (PAGE_NUM * 3);
      if (page) {
        list.push(
          <RepoAbstract
            key={key}
            rootRef={r => elements[pageIndex][i] = r}
            className="item"
            repository={page[i].repository}
            recentItems={page[i].recentItems}
            onExpandChange={this.props.abExpandChange}
          />
        );
      } else {
        list.push(
          <RepoAbstract
            key={key}
            rootRef={r => elements[pageIndex][i] = r}
            className="item"
            loading
            onExpandChange={this.props.abExpandChange}
          />
        );
      }
    }
    return list;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.showPages.toString() != nextProps.showPages.toString()
      || this.props.repoWithRecents != nextProps.repoWithRecents
  }

  render() {
    const { repoWithRecents, repoNumAll } = this.props;
    console.log('ablist render', Date.now())
    return (
      <div>
        {
          this.props.showPages.map(pageIndex =>
            this.constructPageList(pageIndex, repoWithRecents[pageIndex],
              getPageItemsNumber(repoNumAll, pageIndex, PAGE_NUM))
          )
        }
      </div>
    );
  }
}

export default RepoAbList;
