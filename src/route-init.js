import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Editor from './components/Editor.vue';
import Settings from './components/Settings.vue';
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routeTable = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/edit/:id', name: 'edit', component: Editor },
  { path: '/settings', name: 'settings', component: Settings }
];

const AppRouter = new VueRouter({ routes: routeTable, mode: 'history' });
export default AppRouter;
