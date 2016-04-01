import App from '../containers/app';
import RepositoryDetail from '../containers/RepositoryDetail';
import UserDetail from '../containers/UserDetail';
import RepositoriesExplorer from '../containers/RepositoriesExplorer';
import ErrorPage from '../components/ErrorPage';

const routes = {
  path: '/',
  component: App,
  indexRoute: {component: RepositoryDetail},
  childRoutes: [{
    path: 'repository/:id', component: RepositoryDetail
  }, {
    path: 'repository/editor'
  }, {
    path: 'user/:id', component: UserDetail
  }, {
    path: 'user/:id/repositories', component: RepositoriesExplorer
  }, {
    path: 'user/:id/starlist'
  }, {
    path: 'error500', component: ErrorPage
  }, {
    path: 'error404', component: ErrorPage
  }, {
    path: 'error400', component: ErrorPage
  }]
}

export default routes;
