import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home-View.vue'
import ReviewWeb from '../views/Review-Web-View.vue'
import MyFeed from '../views/My-Feed-View.vue'
import Login from '../views/Login-View.vue'
import Feed from '../views/Feed-View.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    } ,
    {
      path: '/review-web',
      name: 'ReviewWeb',
      component: ReviewWeb
    } ,
    {
      path: '/my-feed',
      name: 'MyFeed',
      component: MyFeed
    }
    ,
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
    }
    ,
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
