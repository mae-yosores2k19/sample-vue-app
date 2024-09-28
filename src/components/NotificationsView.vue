<script setup>
const props = defineProps({
  notifications: Array
})
console.log(
  '%c ✂️: props ',
  'font-size:16px;background-color:#225929;color:white;',
  props.notifications
)
</script>

<template>
  <div class="notif-container">
    <v-card>
      <div class="d-flex align-center justify-space-between pa-4">
        <div class="text-h5 font-weight-bold">Notifications</div>
        <v-icon>mdi-dots-vertical</v-icon>
      </div>
      <!-- <v-tabs v-model="tab">
        <v-tab>All</v-tab>
        <v-tab>Unread</v-tab>
      </v-tabs> -->
      <v-list>
        <v-list-item
          v-for="notif in props.notifications"
          :key="notif.id"
          :value="notif.id"
          class="px-4"
        >
          <div class="d-flex align-center ga-2">
            <div class="avatar-container">
              <!-- <v-avatar size="56"> -->
              <img :src="notif.profilePicture" alt="profile-pic" class="prof-pic" />

              <!-- <v-icon class="icon-below" color="white" size="large">mdi-account-group</v-icon> -->
              <v-btn
                color="info"
                class="icon-below"
                size="x-small"
                icon="mdi-account-group"
              ></v-btn>
              <!-- </v-avatar> -->
            </div>
            <div class="text-wrap">
              <p>{{ notif.message }}</p>
            </div>
            <v-icon v-if="notif.isUnread === true" size="x-large" color="primary"
              >mdi-circle-small</v-icon
            >
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<style scoped>
.notif-container {
  width: 360px;
}
.avatar-container {
  position: relative;
  display: inline-block;
}
.icon-below {
  position: absolute;
  bottom: -2px;
  right: -5px;
  background-color: #4777d5;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 0px;
}
.prof-pic {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
