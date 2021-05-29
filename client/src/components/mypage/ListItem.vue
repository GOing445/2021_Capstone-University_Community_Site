<template>
  <v-list-item two-line :key="user.title">
    <v-list-item-avatar>
      <v-img :alt="`${user.title} avatar`" :src="user.avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="user.title"></v-list-item-title>
      <v-list-item-subtitle v-text="user.status"></v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon class="icon" @click="showMenu">
      <v-btn color="primary" fab x-small dark>
        <v-icon>mdi-account-check</v-icon>
      </v-btn></v-list-item-icon
    >
  </v-list-item>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.content:hover,
.icon:hover {
  cursor: pointer;
}
</style>
