<template>
  <v-list subheader>
    <v-subheader>친구 시간표</v-subheader>
    <template v-for="(user, idx) in users">
      <list-item :user="user" :key="user.title" @click-menu="showMenuList" />
      <v-divider v-if="idx < users.length" :key="idx"></v-divider>
    </template>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list dense>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>
            <v-btn color="error" small text>
              {{ item.title }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
    items: [{ title: "친구삭제" }, { title: "친구삭제" }],
  }),

  methods: {
    showMenuList(pos) {
      this.showMenu = false;
      this.x = pos.x;
      this.y = pos.y;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
  },
};
</script>

<style scoped></style>
