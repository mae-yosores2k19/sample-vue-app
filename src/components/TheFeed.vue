<script setup>
import { ref } from 'vue'
const actionBtn = [
  { icon: 'mdi-thumb-up-outline', name: 'Like' },
  { icon: 'mdi-chat-outline', name: 'Comment' },
  { icon: 'mdi-share-outline', name: 'Share' }
]
const posts = [
  {
    id: 1,
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    likes: 123,
    comments: 45,
    shares: 67,
    owner: {
      name: 'John Doe',
      profilePic: 'https://picsum.photos/200/300?random=32'
    },
    images: [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=3',
      'https://picsum.photos/200/300?random=4',
      'https://picsum.photos/200/300?random=5',
      'https://picsum.photos/200/300?random=6',
      'https://picsum.photos/200/300?random=7'
    ]
  }
]

const showImages = ref(false)
</script>

<template>
  <v-container class="padding-side-0">
    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" sm="12">
        <v-card class="post-card mb-4">
          <!-- Post Header -->
          <div class="pa-4">
            <div class="d-flex ga-2">
              <img :src="post.owner.profilePic" alt="profile-pic" class="img-profile" />
              <div>
                <p class="owner-name">{{ post.owner.name }}</p>
                <div class="duration">
                  <span>6 hours ago .</span>
                  <v-icon icon="mdi-earth" color="#65676B" size="x-small" />
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="justify-end">
                <v-btn icon="mdi-dots-horizontal" variant="text" />
                <v-btn icon="mdi-close" variant="text" />
              </div>
            </div>
            <p class="caption">{{ post.caption }}</p>
          </div>
          <!-- Post Images -->
          <v-container class="px-0">
            <v-row>
              <v-col
                v-for="(image, index) in post.images.slice(0, 4)"
                :key="index"
                cols="12"
                :sm="post.images.length === 1 ? '12' : '6'"
                class="pa-1"
              >
                <div class="image-wrapper">
                  <v-img
                    :src="image"
                    class="post-images"
                    :style="{ maxHeight: post.images.length === 1 ? '500px' : '250px' }"
                    cover
                    @click="showImages = true"
                  />
                  <div v-if="index === 3 && post.images.length > 4" class="overlay">
                    <span>+{{ post.images.length - 4 }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <!-- Image Dialog -->

          <v-dialog v-model="showImages" width="auto">
            <v-card
              max-width="400"
              prepend-icon="mdi-update"
              text="Your application will relaunch automatically after the update is complete."
              title="Update in progress"
            >
              <template v-slot:actions>
                <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
              </template>
            </v-card>
          </v-dialog>

          <!-- Post Footer: Likes, Comments, and Shares -->
          <v-card-item>
            <v-row>
              <v-col cols="12" sm="4" md="6">{{ post.likes }} Likes</v-col>
              <v-col cols="12" sm="4" md="3">{{ post.comments }} Comments</v-col>
              <v-col cols="12" sm="4" md="3">{{ post.shares }} Shares</v-col>
            </v-row>
          </v-card-item>

          <v-divider class="mx-4 mb-1" />

          <!-- Action Buttons -->
          <v-card-actions>
            <v-row>
              <v-col v-for="item in actionBtn" :key="item.name" cols="12" sm="4">
                <v-btn :prepend-icon="item.icon" variant="text" block>{{ item.name }}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.post-card {
  margin: 1rem auto;
}

.padding-side-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.post-images {
  height: 500px !important;
}

.owner-name {
  font-weight: 700;
}

.duration {
  font-size: 12px;
}

.image-wrapper {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
}
</style>
