import App from '../containers/app';
import RepositoryDetail from '../containers/RepositoryDetail';
import UserDetail from '../containers/UserDetail';
import SearchPage from '../containers/SearchPage';
import SearchRepoResult from '../containers/SearchRepoResult';
import ErrorPage from '../components/ErrorPage';
import NotImplementPage from '../components/NotImplementPage';

const routes = {
  path: '/',
  component: App,
  indexRoute: {component: RepositoryDetail},
  childRoutes: [{
    path: 'repository/:id', component: RepositoryDetail
  }, {
    path: 'repository/:id/editor'
  }, {
    path: 'repositories', component: NotImplementPage
  }, {
    path: 'stars', component: NotImplementPage
  }, {
    path: 'user/:id', component: UserDetail
  }, {
    path: 'user/:id/repositories', component: NotImplementPage
  }, {
    path: 'user/:id/stars', component: NotImplementPage
  }, {
    path: 'search', component: SearchPage,
    childRoutes: [{
      path: 'repo', component: SearchRepoResult
    }, {
      path: 'link', component: NotImplementPage
    }, {
      path: 'tag', component: NotImplementPage
    }, {
      path: 'user', component: NotImplementPage
    }]
  }, {
    path: 'explorer', component: NotImplementPage
  }, {
    path: 'error500', component: ErrorPage
  }, {
    path: 'error404', component: ErrorPage
  }, {
    path: 'error400', component: ErrorPage
  }]
}

export default routes;
