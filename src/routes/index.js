import App from '../containers/app';
import RepositoryDetail from '../containers/RepositoryDetail';
import UserDetail from '../containers/UserDetail';
import RepositoriesExplorer from '../containers/RepositoriesExplorer';
import SearchPage from '../containers/SearchPage';
import ErrorPage from '../components/ErrorPage';
import RepoAbList from '../containers/RepoAbList';

const routes = {
  path: '/',
  component: App,
  indexRoute: {component: RepositoryDetail},
  childRoutes: [{
    path: 'repository/:id', component: RepositoryDetail
  }, {
    path: 'repository/:id/editor'
  }, {
    path: 'repositories', component: RepositoriesExplorer
  }, {
    path: 'stars', component: RepositoriesExplorer
  }, {
    path: 'user/:id', component: UserDetail
  }, {
    path: 'user/:id/repositories', component: RepositoriesExplorer
  }, {
    path: 'user/:id/stars', component: RepositoriesExplorer
  }, {
    path: 'search', component: SearchPage,
    childRoutes: [{
      path: 'repo', component: RepoAbList
    }, {
      path: 'link', component: RepoAbList
    }, {
      path: 'tag', component: RepoAbList
    }, {
      path: 'user', component: RepoAbList
    }]
  }, {
    path: 'error500', component: ErrorPage
  }, {
    path: 'error404', component: ErrorPage
  }, {
    path: 'error400', component: ErrorPage
  }]
}

export default routes;
