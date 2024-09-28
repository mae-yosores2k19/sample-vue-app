<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  friendRequest: Object,
  friends: Array
})

const router = useRouter()

const gotoFriendRequests = () => {
  router.push({ name: 'FriendRequests', query: { fbID: 'jessa-id' } })
}
</script>

<template>
  <div class="sidebar">
    <div class="sticky-sidebar">
      <v-list density="compact" nav class="list-container">
        <div v-if="friendRequest && Object.keys(friendRequest).length !== 0">
          <v-row class="header">
            <v-col cols="8">
              <p>Friend Requests</p>
            </v-col>
            <v-col cols="4" align="end">
              <span class="see-all" @click="gotoFriendRequests">See All</span>
            </v-col>
          </v-row>
          <div>
            <div class="friend-request">
              <img
                :src="props.friendRequest.profilePic"
                alt="Profile picture"
                class="profile-pic"
              />
              <div class="request-info">
                <b>{{ props.friendRequest.name }}</b>
                <p class="subtitle">{{ props.friendRequest.numberOfMutual }} mutual friends</p>
              </div>
            </div>
            <div class="request-actions">
              <v-btn rounded="xs" color="primary" elevation="0">Confirm</v-btn>
              <v-btn rounded="xs" :color="'#e4e6eb'" elevation="0">Delete</v-btn>
            </div>
          </div>
        </div>

        <v-divider />
        <div class="contact-container">
          <p class="header">Contacts</p>
          <span>
            <v-icon icon="mdi-magnify"></v-icon>
            <v-icon icon="mdi-dots-horizontal"></v-icon>
          </span>
        </div>
        <v-list-item
          v-for="item in props.friends"
          :key="item"
          :prepend-avatar="item.profilePic"
          :title="item.name"
          :value="item.value"
        />
      </v-list>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  background-color: transparent;
}

.contact-container {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 8px;
}

.header {
  font-size: 1.0625rem;
  color: #65676b;
  font-weight: 600;
  padding-bottom: 8px;
}

.friend-request {
  display: flex;
  gap: 8px;
  padding: 8px 0;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.subtitle {
  color: #8a8c90;
  font-size: 0.75rem;
}

.request-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.see-all {
  font-size: 0.75rem;
  color: #0866ff;
  cursor: pointer;
}
</style>
