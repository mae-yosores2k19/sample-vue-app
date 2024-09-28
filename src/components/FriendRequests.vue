<script setup>
import { useFriendRequestStore } from '@/stores'
import { onMounted, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const fbId = route.query.fbID || ''

const store = useFriendRequestStore()
const { getFriendRequestById, setFriendRequest } = store
const friendRequests = ref([])

onMounted(async () => {
  const list = await getFriendRequestById(fbId)
  friendRequests.value = toRaw(list)
})

const handleAcceptRequest = async (id) => {
  const updatedList = await setFriendRequest(id, 'confirm')
  friendRequests.value = updatedList
}

const handleDeclineRequest = async (id) => {
  const newList = await setFriendRequest(id, 'delete')
  console.log(
    '%c 🤸: handleDeclineRequest -> newList ',
    'font-size:16px;background-color:#5d5c6a;color:white;',
    newList
  )
  friendRequests.value = newList
}
</script>

<template>
  <v-app>
    <v-layout class="layout-container">
      <v-navigation-drawer border="none" permanent>
        <div class="scroll-container">
          <div class="sticky-container">
            <v-list density="compact" nav class="list-container">
              <v-list-item
                prepend-avatar="https://picsum.photos/200/300?random=31"
                title="Jessa Mae Yosores"
              ></v-list-item>
              <v-list-item
                v-for="item in ['Friend Request', 'Sugggestions', 'All Friends']"
                :key="item"
                :title="item"
                :value="item"
              ></v-list-item>
            </v-list>
          </div>
        </div>
      </v-navigation-drawer>
      <v-main class="bg-transparent">
        <div class="scroll-container">
          <div class="sticky-container">
            <div class="container">
              <p class="title">Friend Requests</p>
              <v-row justify="center" align="center">
                <v-col
                  v-for="item in friendRequests"
                  :key="item.id"
                  cols="12"
                  xs="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card max-width="344">
                    <v-img height="200px" :src="item.profilePic" cover />
                    <v-card-title> {{ item.name }} </v-card-title>
                    <v-card-subtitle> {{ item.numberOfMutual }} mutual friends </v-card-subtitle>
                    <v-card-actions>
                      <div class="actions-btn">
                        <v-btn
                          variant="flat"
                          color="primary"
                          elevation="0"
                          block
                          text="Confirm"
                          class="mb-2"
                          @click="handleAcceptRequest(item.id)"
                        />
                        <v-btn
                          variant="flat"
                          :color="'#e4e6eb'"
                          elevation="0"
                          block
                          text="Delete"
                          @click="handleDeclineRequest(item.id)"
                        />
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
.container {
  padding: 0 2rem;
  width: 100%;
}

.title {
  font-size: 1.25rem;
  word-wrap: break-word;
  font-weight: 700;
  margin-bottom: 16px !important;
}

.actions-btn {
  width: 100%;
  gap: 8px;
}
</style>
