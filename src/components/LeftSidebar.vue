<script setup>
const props = defineProps({
  sidebarItems: Array
})
</script>

<template>
  <div class="sidebar">
    <div class="sticky-sidebar">
      <v-list density="compact" nav class="list-container">
        <v-list-item
          prepend-avatar="https://picsum.photos/200/300?random=31"
          title="Jessa Mae Yosores"
        ></v-list-item>
        <v-list-item
          v-for="item in props.sidebarItems"
          :key="item"
          :prepend-icon="item.icon"
          :title="item.name"
          :value="item.value"
        ></v-list-item>
        <v-divider />
        <h2>Your Shortcuts</h2>
      </v-list>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  background-color: transparent;
}
</style>
