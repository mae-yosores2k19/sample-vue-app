import { ref } from 'vue'
import { defineStore } from 'pinia'
import mocks from '../mocks'
const { friendsList } = mocks

export const useFriendRequestStore = defineStore('friends', () => {
  const friends = ref([
    {
      accountId: 'jessa-id',
      friendsList: friendsList
    }
  ])

  const getAcceptedFriends = (id) => {
    const { friendsList } = friends.value.find((fb) => fb.accountId === id)
    return friendsList.filter((friend) => friend.status === 'confirmed')
  }

  const getFriendRequestById = (id, firstOnly = false) => {
    const { friendsList } = friends.value.find((fb) => fb.accountId === id)
    const friendsRequest = friendsList.filter((friend) => friend.status === 'requested')
    if (firstOnly) return friendsRequest[0]
    return friendsRequest
  }

  const setFriendRequest = (friendId, action) => {
    const account = friends.value.find((fb) => fb.friendsList.some((fr) => fr.id === friendId))

    if (account) {
      const friendIndex = account.friendsList.findIndex((fr) => fr.id === friendId)
      if (friendIndex !== -1) {
        if (action === 'confirm') {
          account.friendsList[friendIndex].status = 'confirmed'
        } else if (action === 'delete') {
          if (account.friendsList[friendIndex].status === 'requested') {
            account.friendsList.splice(friendIndex, 1)
          }
        }
      }
      return account.friendsList.filter((friend) => friend.status === 'requested')
    }
    return []
  }

  return { getAcceptedFriends, getFriendRequestById, setFriendRequest }
})
