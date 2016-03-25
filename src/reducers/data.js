import { combineReducers } from 'redux';

const defaultUser = {
  id: -1,
  email: 'itoumakoto@overflow.com',
  nickname: 'itou_makoto',
  sign: '都是世界的错',
  starlist: [-1],
  repositories: [-1]
};

const defaultRepo = {
  id: -1,
  name: 'katsura_doujinshi',
  creatorId: -1,
  creatorName: 'itou_makoto',
  status: 1,
  stars: 12450,
  created_at: '2010-10-11 21:21:21',
  updated_at: '2010-10-11 21:21:21',
  tags: [-1],
  description: 'My katsura\'s doujinshi',
  items: [{
    type: 'repo',
    id: -1
  }, {
    type: 'link',
    id: -1
  }],
  recentItems: [{
    type: 'repo',
    id: -1
  }, {
    type: 'link',
    id: -1
  }]
};

const defaultLink = {
  id: -1,
  title: 'katsura',
  url: 'https://www.google.co.jp/search?q=%E6%A1%82%E8%A8%80%E5%8F%B6&espv=2&rlz=1C1CHWL_zh-CNJP681JP682&biw=1157&bih=587&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwiXgJKIq9vLAhXDGJQKHbvnA88QsAQIJw',
  description: 'Goodjob Google',
  tags: [-1]
};

const defaultTag = {
  id: -1,
  text: 'katsura',
  used: 12
};

function users(state = { '-1': defaultUser }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function repositories(state = { '-1': defaultRepo }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function links(state = { '-1': defaultLink }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function tags(state = { default: defaultTag }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

const data = combineReducers({
  users,
  repositories,
  links,
  tags
});

export default data;
