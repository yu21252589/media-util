import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../App.vue'),
    children: [
      {
        path: '/aa',
        name: 'aa',
        component: () => import('../../dictionaries/aa/readme.md'),
      },
    ],
  },
  {
    path: '/md',
    name: 'md',
    component: () => import(/* webpackChunkName: "markdown" */'../views/markdown.vue'),
  },
  // { path: '*', redirect: '/' },
];

const routerHistory = createWebHashHistory();
const router = createRouter({
  history: routerHistory,
  // base: process.env.BASE_URL,
  routes,
});

export default router;
