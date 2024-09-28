<script setup>
import LeftSidebar from '../components/LeftSidebar.vue'
import RightSidebar from '../components/RightSidebar.vue'
import TheFeed from '../components/TheFeed.vue'

const sideBarItems = [
  {
    name: 'Friends',
    icon: 'mdi-account-multiple',
    value: 'friends'
  },
  {
    name: 'Memories',
    icon: 'mdi-clock-outline',
    value: 'memories'
  },
  {
    name: 'Saved',
    icon: 'mdi-pocket',
    value: 'saved'
  },
  {
    icon: 'mdi-account-group-outline',
    name: 'Groups',
    value: 'groups'
  },
  {
    icon: 'mdi-youtube-tv',
    name: 'Video',
    value: 'video'
  },
  {
    icon: 'mdi-storefront',
    name: 'Marketplace',
    value: 'marketplace'
  }
]

const stories = [
  {
    items: [
      { src: 'https://picsum.photos/200/300?random=20', name: 'Irish Rufo' },
      { src: 'https://picsum.photos/200/300?random=21', name: 'Justine Catacutan' },
      { src: 'https://picsum.photos/200/300?random=22', name: 'Emma Cruz' }
    ]
  },
  {
    items: [
      { src: 'https://picsum.photos/200/300?random=11', name: 'Redgie Santos' },
      { src: 'https://picsum.photos/200/300?random=12', name: 'Julia Roberts' },
      { src: 'https://picsum.photos/200/300?random=13', name: 'Vanessa Amandoron' }
    ]
  }
]

import { useFriendRequestStore } from '@/stores'
import { onMounted, ref, toRaw } from 'vue'
// import { storeToRefs } from 'pinia'

const store = useFriendRequestStore()
const { getAcceptedFriends, getFriendRequestById } = store

const friendRequest = ref({})
const friends = ref([])

onMounted(async () => {
  const firstOnly = await getFriendRequestById('jessa-id', true)
  friendRequest.value = toRaw(firstOnly)
  const list = await getAcceptedFriends('jessa-id')
  friends.value = toRaw(list)
})
</script>

<template>
  <v-app>
    <v-layout class="layout-container">
      <v-navigation-drawer class="bg-transparent" border="none">
        <div class="scroll-container">
          <div class="sticky-container">
            <LeftSidebar :sidebarItems="sideBarItems" />
          </div>
        </div>
      </v-navigation-drawer>

      <v-navigation-drawer location="right" class="bg-transparent" border="none" permanent>
        <div class="scroll-container">
          <div class="sticky-container">
            <RightSidebar :friends="friends" :friendRequest="friendRequest" />
          </div>
        </div>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center">
        <div class="scroll-container">
          <div class="sticky-container">
            <div class="content-container">
              <v-card class="create-post">
                <div class="d-flex pa-4 ga-2">
                  <img
                    src="https://picsum.photos/200/300?random=21"
                    alt="profile-pic"
                    class="img-profile"
                  />
                  <v-text-field
                    density="compact"
                    placeholder="What's on your mind mate?"
                    variant="plain"
                    hide-details
                    single-line
                    class="custom-search-input"
                  />
                </div>
                <div class="d-flex pa-2 justify-sm-start justify-md-center flex-wrap">
                  <v-btn variant="text">
                    <v-icon color="error" icon="mdi-video-plus-outline" start size="32" />
                    Live Video
                  </v-btn>
                  <v-btn variant="text">
                    <v-icon color="success" icon="mdi-image-multiple" start size="32" />
                    Photo/Video
                  </v-btn>
                  <v-btn variant="text">
                    <v-icon color="warning" icon="mdi-emoticon-happy-outline" start size="32" />

                    Feeling/Activity
                  </v-btn>
                </div>
              </v-card>
              <v-carousel hide-delimiters height="200">
                <v-carousel-item v-for="(slide, index) in stories" :key="index" cover>
                  <v-row>
                    <v-col v-for="(item, i) in slide.items" :key="i" cols="12" sm="4">
                      <v-card class="story-card">
                        <v-img :src="item.src" height="200px" cover></v-img>
                        <v-card-title class="title-overlay">{{ item.name }}</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-carousel-item>
              </v-carousel>
              <TheFeed />
            </div>
          </div>
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
.content-container {
  height: 100%;
  max-width: 590px;
  margin: 0 auto;
}

.story-card {
  border-radius: 20px;
  position: relative;
}

.title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.132);
  color: white;
  text-align: center;
  padding: 10px;
  text-transform: capitalize;
  font-size: 16px;
}

.create-post {
  border-radius: 20px;
  background-color: #ffffff;
  text-transform: capitalize !important;
  margin-bottom: 1rem;
}

.divider {
  margin: 12px 0 8px;
}
</style>
