import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Editor from './components/Editor.vue';
import Settings from './components/Settings.vue';
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routeTable = [
  { path: '/', name: 'login', component: Login },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/edit/:id', name: 'edit', component: Editor },
  { path: '/settings', name: 'settings', component: Settings }
];

const AppRouter = new VueRouter({ routes: routeTable, mode: 'history', 
  base: process.env.NODE_ENV === 'production' ? '/' : '/' });
export default AppRouter;
