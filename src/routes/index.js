import App from '../containers/app';
import RepositoryDetail from '../containers/RepositoryDetail';
import UserDetail from '../containers/UserDetail';
import RepositoriesExplorer from '../containers/RepositoriesExplorer';

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: RepositoryDetail },
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
    path: '*'   // 404
  }]
}

export default routes;
