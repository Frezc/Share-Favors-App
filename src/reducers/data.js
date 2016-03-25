import { combineReducers } from 'redux';

const defaultUser = {
  id: 'default',
  email: 'itoumakoto@overflow.com',
  nickname: 'itou_makoto',
  sign: '都是世界的错',
  starlist: ['default'],
  repositories: ['default']
};

const defaultRepo = {
  id: 'default',
  name: 'katsura_doujinshi',
  creatorId: 'default',
  creatorName: 'itou_makoto',
  status: 1,
  stars: 12450,
  created_at: '2010-10-11 21:21:21',
  updated_at: '2010-10-11 21:21:21',
  tags: ['default'],
  description: 'My katsura\'s doujinshi',
  items: [{
    type: 'repo',
    id: 'default'
  }, {
    type: 'link',
    id: 'default'
  }],
  recentItems: [{
    type: 'repo',
    id: 'default'
  }, {
    type: 'link',
    id: 'default'
  }]
};

const defaultLink = {
  id: 'default',
  title: 'katsura',
  url: 'https://www.google.co.jp/search?q=%E6%A1%82%E8%A8%80%E5%8F%B6&espv=2&rlz=1C1CHWL_zh-CNJP681JP682&biw=1157&bih=587&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwiXgJKIq9vLAhXDGJQKHbvnA88QsAQIJw',
  description: 'Goodjob Google',
  tags: ['default']
};

const defaultTag = {
  id: 'default',
  text: 'katsura',
  used: 12
};

function users(state = { default: defaultUser }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function repositories(state = { default: defaultRepo }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function links(state = { default: defaultLink }, action) {
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
