<template>
  <v-list-item two-line :key="user.title">
    <v-list-item-avatar>
      <v-img :alt="`${user.title} avatar`" :src="user.avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content class="content">
      <v-list-item-title v-text="user.title"></v-list-item-title>
      <v-list-item-subtitle v-text="user.status"></v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon height="40"> mdi-menu </v-icon>
    </v-list-item-icon>
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
};
</script>

<style scoped>
.content:hover {
  cursor: pointer;
}
</style>
