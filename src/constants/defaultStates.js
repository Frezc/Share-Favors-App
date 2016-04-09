export const defaultUser = {
  id: -1,
  email: 'youremail@email.com',
  nickname: 'click to login',
  sign: '这是非常长的文字这是非常长的文字&2这是非常长的文字&3这是非常长的文字&4这是非常长的文字&5这是非常长的文字',
  starlist: [],
  repositories: []
};

export const defaultLink = {
  type: 'link',
  id: -1,
  title: 'katsura',
  url: 'https://www.google.co.jp/search?q=%E6%A1%82%E8%A8%80%E5%8F%B6&espv=2&rlz=1C1CHWL_zh-CNJP681JP682&biw=1157&bih=587&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwiXgJKIq9vLAhXDGJQKHbvnA88QsAQIJw',
  description: 'Goodjob Google',
  tags:[{
    id: -1,
    text: 'katsura',
    used: 12
  }],
  created_at: '2010-10-11 21:21:21',
  updated_at: '2010-10-11 21:21:21'
};

export const defaultRepoAb = {
  id: -1,
  title: 'katsura_doujinshi',
  creator_id: -1,
  creator_name: 'itou_makoto',
  status: 1,
  stars: 12450,
  created_at: '2010-10-11 21:21:21',
  updated_at: '2010-10-11 21:21:21',
  tags: [{
    id: -1,
    text: 'katsura',
    used: 12
  }],
  description: 'My katsura\'s doujinshi',
  repoNum: 1,
  linkNum: 1
};

export const defaultRepoWithRecent = Object({}, defaultRepoAb, {
  recentItems: [Object.assign({
    type: 'repo',
    created_at: '2010-10-11 21:21:21'
  }, defaultRepoAb), defaultLink]
});

export const defaultRepoWithItems = Object({}, defaultRepoAb, {
  items: [Object.assign({
    type: 'repo',
    created_at: '2010-10-11 21:21:21'
  }, defaultRepoAb), defaultLink]
});

export const defaultRepo = {
  id: -1,
  title: 'katsura_doujinshi',
  creator_id: -1,
  creator_name: 'itou_makoto',
  status: 1,
  stars: 12450,
  created_at: '2010-10-11 21:21:21',
  updated_at: '2010-10-11 21:21:21',
  tags: [{
    id: -1,
    text: 'katsura',
    used: 12
  }],
  description: 'My katsura\'s doujinshi',
  repoNum: 1,
  linkNum: 1,
  items: [{
    type: 'repo',
    id: -1,
    created_at: '2010-10-11 21:21:21',
    updated_at: '2010-10-11 21:21:21'
  }, defaultLink],
  recentItems: [{
    type: 'repo',
    id: -1,
    created_at: '2010-10-11 21:21:21',
    updated_at: '2010-10-11 21:21:21'
  }, defaultLink]
};

export const DEFAULT_AUTHDIALOG = {
  type: 'auth',
  loading: false,
  visible: false,
  error: ''
};

export const DEFAULT_LINKDIALOG = {
  type: 'watch',
  visible: false,
  loading: false,
  link: {
    id: -1,
    title: 'katsura',
    url: 'https://www.google.co.jp/search?q=%E6%A1%82%E8%A8%80%E5%8F%B6&espv=2&rlz=1C1CHWL_zh-CNJP681JP682&biw=1157&bih=587&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwiXgJKIq9vLAhXDGJQKHbvnA88QsAQIJw',
    description: 'Goodjob Google',
    tags:[{
      id: -1,
      text: 'katsura',
      used: 12
    }],
    created_at: '2010-10-11 21:21:21',
    updated_at: '2010-10-11 21:21:21'
  },
  error: ''
};

export const DEFAULT_AUTH = {
  user: -1,
  token: '',
  expired_at: null
};

export const DEFAULT_SNACKBAR = {
  visible: false,
  message: 'Something goes wrong!!'
};

export const DEFAULT_SENDEMAIL = {
  canSendEmail: true,
  sendEmailCounting: false
}

export const DEFAULT_CONTENT = {
  loading: false,
  error: ''
}
