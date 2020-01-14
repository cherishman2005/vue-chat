import Vue from 'vue'
import Router from 'vue-router'

const author = resolve => require(['@/components/login/author'], resolve)
const error = resolve => require(['@/page/error.vue'], resolve)
const chat_test = resolve => require(['@/components/chat_test.vue'], resolve)

Vue.use(Router);
const routes = [
  {path: '*', component: error},
  {path: '/author', component: author, name: "author" },
  {path: '/chat-test', component: chat_test, name: "chat-test" },
];

const router = new Router({
  mode: 'history',
  base: '/chatroom-dev/',
  scrollBehavior: () => ({y: 0}),
  routes: routes,
});
export default router;

