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
    path: 'user/:id', component: UserDetail,
    onEnter: () => console.log(global)
  }, {
    path: 'user/:id/repositories', component: RepositoriesExplorer
  }, {
    path: 'user/:id/starlist'
  }]
}

export default routes;
