import Login from '@components/Login'
import Dashboard from '@components/Dashboard'
import Viewer from '@components/Viewer';
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routeTable = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard }
];

const AppRouter = new VueRouter({ routes: routeTable, mode: 'history' });
export default AppRouter;
