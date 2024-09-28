<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import NotificationsView from './NotificationsView.vue'
import MessengerView from './MessengerView.vue'
import MenuView from './MenuView.vue'

const items = ref([
  { icon: 'mdi-view-dashboard', name: 'menu' },
  { icon: 'mdi-facebook-messenger', name: 'messenger', content: 2 },
  { icon: 'mdi-bell', name: 'notifications', content: 0 }
])

const tab = ref('home')
const tabs = [
  {
    icon: 'mdi-home-outline',
    name: 'home',
    value: 'home'
  },
  {
    icon: 'mdi-youtube-tv',
    name: 'video',
    value: 'video'
  },
  {
    icon: 'mdi-storefront',
    name: 'marketplace',
    value: 'marketplace'
  },
  {
    icon: 'mdi-account-group-outline',
    name: 'groups',
    value: 'groups'
  },
  {
    icon: 'mdi-gamepad-variant-outline',
    name: 'gaming',
    value: 'gaming'
  }
]
const menuAccount = [
  {
    title: 'Settings & Privacy',
    value: 'settings',
    props: {
      prependIcon: 'mdi-cog',
      appendIcon: 'mdi-chevron-right'
    }
  },
  {
    title: 'Help & Support',
    value: 'help',
    props: {
      prependIcon: 'mdi-help-circle',
      appendIcon: 'mdi-chevron-right'
    }
  },
  {
    title: 'Display & Accessibility',
    value: 'display',
    props: {
      prependIcon: 'mdi-moon-waning-crescent',
      appendIcon: 'mdi-chevron-right'
    }
  },
  {
    title: 'Give Feedback',
    value: 'feedback',
    props: {
      prependIcon: 'mdi-message-alert'
    }
  },
  {
    title: 'Logout',
    value: 'logout',
    props: {
      prependIcon: 'mdi-logout'
    }
  }
]
const router = useRouter()

const navigateTo = (routeName) => {
  router.push({ name: routeName })
}
import { useNotificationStore } from '../stores'
const store = useNotificationStore()

const { getNotifications } = store
const notifications = ref([])

onMounted(async () => {
  const list = await getNotifications('jessa-id')
  notifications.value = toRaw(list)
})
const currentDropdown = ref(null)
const menuActivator = ref(null)
const menuVisible = ref(false)

const toggleDropdown = (name, event) => {
  if (currentDropdown.value === name) {
    menuVisible.value = !menuVisible.value
  } else {
    currentDropdown.value = name
    menuActivator.value = event.currentTarget
    menuVisible.value = true
  }
}
</script>

<template>
  <v-app-bar app class="nav-container">
    <div class="btn-container">
      <img src="@/assets/facebook.png" alt="facebook-logo" class="btn-icon-lg" />
      <div class="search">
        <v-text-field
          width="250"
          density="compact"
          placeholder="Search Facebook"
          prepend-inner-icon="mdi-magnify"
          variant="plain"
          hide-details
          single-line
          class="custom-search-input"
        />
      </div>
    </div>
    <v-spacer />
    <v-tabs
      v-model="tab"
      :items="tabs"
      align-tabs="center"
      height="60"
      selected-class="selected-tab"
      slider-color="#0866ff"
    >
      <template v-slot:tab="{ item }">
        <v-tab
          :text="item.text"
          :value="item.value"
          class="custom-tab"
          size="x-large"
          @click="navigateTo(item.name)"
        >
          <v-icon :color="tab === item.value ? 'primary' : ''">{{ item.icon }}</v-icon>
          <span class="tab-text">{{ item.name }}</span>
        </v-tab>
      </template>
    </v-tabs>
    <v-spacer />
    <div class="btn-container">
      <v-btn
        v-for="item in items"
        :key="item.name"
        class="btn-icon-lg nav-icon"
        icon
        @click="toggleDropdown(item.name, $event)"
      >
        <v-badge v-if="item.content > 0" color="error" :content="item.content">
          <v-icon>{{ item.icon }}</v-icon>
        </v-badge>
        <v-icon v-else>{{ item.icon }}</v-icon>
        <v-menu
          v-model="menuVisible"
          :close-on-content-click="false"
          offset-y
          :activator="menuActivator"
          location="bottom center"
        >
          <template v-slot:default>
            <NotificationsView
              v-if="currentDropdown === 'notifications'"
              :notifications="notifications"
            />
            <MessengerView v-if="currentDropdown === 'messenger'" />
            <MenuView v-if="currentDropdown === 'menu'" />
          </template>
        </v-menu>
      </v-btn>
    </div>

    <div>
      <v-btn icon> <v-icon>mdi-account</v-icon> </v-btn><br />
      <v-menu activator="parent" class="mb-6">
        <v-card min-width="360">
          <div class="d-flex pa-4 ga-2 align-center">
            <img src="https://picsum.photos/200/300?random=21" class="img-profile" alt="" />
            <b>Jessa Mae Yosores</b>
          </div>
          <v-list class="px-4 menu-account">
            <v-list-item v-for="(item, index) in menuAccount" :key="index" :value="index">
              <div class="d-flex align-center ga-2">
                <v-icon class="prependIcon">{{ item.props.prependIcon }}</v-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-icon class="ml-auto">{{ item.props.appendIcon }}</v-icon>
              </div>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<style scoped>
.nav-container {
  padding: 0 1rem !important;
}

.fb-logo {
  width: 40px !important;
  height: 40px !important;
}

.btn-container {
  display: flex;
  gap: 0.5rem;
}

.nav-icon {
  border-radius: 50px;
  background: #f0f2f5;
}

.custom-search-input {
  position: relative;
  align-items: stretch;
  border-radius: 50px;
  background-color: #f0f2f5;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.selected-tab {
  color: var(--primary-button-background);
}

.custom-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: inherit;
  flex-direction: column;
  width: 100px;
}

.custom-tab .tab-text {
  position: absolute;
  bottom: 0px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
  font-size: 12px;
  text-transform: capitalize;
}

.custom-tab:hover .tab-text {
  opacity: 1;
}
.custom-tab v-icon:active {
  color: var(--primary-button-background);
}
.custom-tab v-icon {
  margin-right: 0;
  transition: margin-right 0.3s ease-in-out;
}

.custom-tab:hover v-icon {
  margin-right: 0.5rem;
}
.menu-account {
  color: black;
}
.prependIcon {
  background-color: #e4e6eb;
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: 20px;
  align-content: center;
}
</style>
