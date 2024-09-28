import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VideoView from '../views/VideoView.vue'
import MarketplaceView from '../views/MarketplaceView.vue'
import GroupView from '../views/GroupView.vue'
import GamingView from '../views/GamingView.vue'
import NotificationsView from '../views/NotificationView.vue'
import MessengerView from '../views/MessengerView.vue'
import FriendRequests from '../components/FriendRequests.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/video', name: 'video', component: VideoView },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: MarketplaceView
    },
    { path: '/groups', name: 'groups', component: GroupView },
    {
      path: '/gaming',
      name: 'gaming',
      component: GamingView
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: NotificationsView
    },
    {
      path: '/messenger',
      name: 'messenger',
      component: MessengerView
    },
    {
      path: '/friend-requests',
      name: 'FriendRequests',
      component: FriendRequests
    }
  ]
})

export default router
