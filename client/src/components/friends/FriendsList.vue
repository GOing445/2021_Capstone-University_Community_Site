<template>
  <v-list subheader>
    <v-subheader>친구 시간표</v-subheader>
    <template v-for="(user, idx) in users">
      <list-item :user="user" :key="user.title" />
      <v-divider v-if="idx < users.length" :key="idx"></v-divider>
    </template>
  </v-list>
</template>

<script>
import ListItem from "@/components/friends/ListItem";

export default {
  components: { ListItem },
  data: () => ({
    users: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "김수빈",
        status: "하하하",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "박호성",
        status: "호호호",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "이연권",
        status: "히히히",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "최두영",
        status: "퉤퉤퉤",
      },
    ],
    showMenu: false,
    x: 0,
    y: 0,
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),

  methods: {
    clickRightUser(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
  },
};
</script>

<style scoped></style>
