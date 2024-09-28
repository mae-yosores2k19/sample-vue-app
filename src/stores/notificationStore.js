import { defineStore } from 'pinia'
import { ref } from 'vue'
import mocks from '../mocks'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref([
    {
      accountId: 'jessa-id',
      notifications: mocks.notifications
    }
  ])

  const getNotifications = (id) => {
    const account = notifications.value.find((fb) => fb.accountId === id)
    return account?.notifications || []
  }

  return { getNotifications }
})
