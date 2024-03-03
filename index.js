import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import SubItem from '../components/SubItem.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/item/:cid',
      name:'item',
      component: SubItem
    },
    {
      path:'/item/:cid/sub/:sid',
      name:'subitem',
      component: SubItem
    }
  ]
})

router.beforeEach((to, from , next)=>{
  document.title = to.name
  next()
})

export default router
