<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <v-img :alt="`${user.name} avatar`" :src="user.avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content
      class="content"
      @click="$router.push(`friend-timetable/${user.id}/${user.name}`)"
    >
      <v-list-item-title v-text="user.name"></v-list-item-title>
      <v-list-item-subtitle v-text="user.invCode"></v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon class="icon" @click="showMenu">
      <v-icon height="40">mdi-menu</v-icon>
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
  methods: {
    showMenu(e) {
      e.preventDefault();
      this.$emit("click-menu", {
        x: e.clientX,
        y: e.clientY,
        id: this.user.id,
      });
    },
  },
};
</script>

<style scoped>
.content:hover,
.icon:hover {
  cursor: pointer;
}
</style>
