import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/', redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component:()=> import('@/views/user/login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component:()=> import('@/views/user/register.vue')
    },
    {
      path: '/userpage',
      name: 'userpage',
      component:()=> import('@/views/user/userpage.vue')
    },
    {
      path: '/article',
      name: 'article',
      component:()=> import('@/views/blog/detail.vue')
    },
    {
      path: '/write',
      name: 'write',
      component:()=> import('@/views/blog/write.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component:()=> import('@/views/blog/blog.vue')
    },
    {
      path: '/page404',
      name: 'page404',
      component:()=> import('@/views/404.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component:()=> import('@/views/forum/forum.vue')
    },
    {
      path: '/section',
      name: 'section',
      component:()=> import('@/views/forum/section.vue')
    },
    {
      path: '/posting',
      name: 'posting',
      component:()=> import('@/views/forum/posting.vue')
    },
    {
      path: '/writeposting',
      name: 'writeposting',
      component:()=> import('@/views/forum/write.vue')
    },
    {
      path: '/md5',
      name: 'md5',
      component:()=> import('@/views/tools/md5.vue')
    },
    {
      path: '/tools',
      name: 'tools',
      component:()=> import('@/views/tools/tools.vue')
    },
    {
      path: '/base64',
      name: 'base64',
      component:()=> import('@/views/tools/base64.vue')
    },
    {
      path: '/fileshare',
      name: 'fileshare',
      component:()=> import('@/views/tools/fileshare.vue')
    },
    {
      path: '/connectus',
      name: 'connectus',
      component:()=> import('@/views/connectus.vue')
    },
    {
      path: '/findbug',
      name: 'findbug',
      component:()=> import('@/views/findbug.vue')
    },
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
