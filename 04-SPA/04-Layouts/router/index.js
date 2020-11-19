import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const MeetupsPage = () => import('../views/MeetupsPage');
const LoginPage = () => import('../views/LoginPage');
const FormPage = () => import('../views/FormPage');

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/04-Layouts',
  routes: [
    {
      path: '/',
      name: 'meetups',
      component: MeetupsPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/form',
      name: 'form',
      component: FormPage,
    },
  ],
});
