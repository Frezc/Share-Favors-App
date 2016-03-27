const defaultUser = {
  id: -1,
  email: 'youremail@email.com',
  nickname: 'not login',
  sign: '',
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


const DEFAULT_AUTHDIALOG = {
  type: 'auth',
  loading: false,
  visible: false,
  error: ''
};

const DEFAULT_LINKDIALOG = {
  type: 'watch',
  visible: false,
  loading: false,
  link: -1,
  error: ''
};

const DEFAULT_AUTH = {
  user: -1,
  token: '',
  expired_at: null
};

const DEFAULT_SNACKBAR = {
  visible: false,
  message: 'Something goes wrong!!'
};

export { 
  defaultUser, defaultRepo, defaultLink, defaultTag, 
  DEFAULT_AUTHDIALOG, DEFAULT_LINKDIALOG, DEFAULT_AUTH,
  DEFAULT_SNACKBAR
};
