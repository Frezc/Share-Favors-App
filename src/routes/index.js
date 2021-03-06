import App from '../containers/app';
import RepositoryDetail from '../containers/RepositoryDetail';
import UserDetail from '../containers/UserDetail';
import SearchPage from '../containers/SearchPage';
import SearchRepoResult from '../containers/SearchRepoResult';
import SearchTagResult from '../containers/SearchTagResult';
import ErrorPage from '../components/ErrorPage';
import NotImplementPage from '../components/NotImplementPage';
import SearchLinkResult from "../containers/SearchLinkResult";
import SearchUserResult from "../containers/SearchUserResult";
import SelfRepositories from '../containers/SelfRepositories';
import UserRepositories from '../containers/UserRepositories';

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: NotImplementPage
  },
  childRoutes: [{
    path: 'repository/:id', component: RepositoryDetail
  }, {
    path: 'repository/:id/editor'
  }, {
    path: 'repositories', component: SelfRepositories
  }, {
    path: 'stars', component: SelfRepositories
  }, {
    path: 'user/:id', component: UserDetail
  }, {
    path: 'user/:id/repositories', component: UserRepositories
  }, {
    path: 'user/:id/stars', component: UserRepositories
  }, {
    path: 'search', component: SearchPage,
    childRoutes: [{
      path: 'repo', component: SearchRepoResult
    }, {
      path: 'link', component: SearchLinkResult
    }, {
      path: 'tag', component: SearchTagResult
    }, {
      path: 'user', component: SearchUserResult
    }]
  }, {
    path: 'explorer', component: NotImplementPage
  }, {
    path: 'tags', component: NotImplementPage
  }, {
    path: 'tag/:text', component: NotImplementPage
  }, {
    path: 'error500', component: ErrorPage
  }, {
    path: 'error404', component: ErrorPage
  }, {
    path: 'error400', component: ErrorPage
  }, {
    path: 'error', component: ErrorPage
  }]
}

export default routes;
