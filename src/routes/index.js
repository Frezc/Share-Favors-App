import App from '../containers/app';
import RepositoryDetail from '../containers/RepositoryDetail';
import UserDetail from '../containers/UserDetail';
import RepositoriesExplorer from '../containers/RepositoriesExplorer';
import SearchPage from '../containers/SearchPage';
import ErrorPage from '../components/ErrorPage';
import RepoAbList from '../containers/RepoAbList';
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
      path: 'repo', component: NotImplementPage
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
