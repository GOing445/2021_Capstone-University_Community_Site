<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <v-img :alt="`${user.username} avatar`" :src="user.avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="user.username"></v-list-item-title>
      <v-list-item-subtitle v-text="user.invCode"></v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon class="icon" @click="acceptFriend">
      <v-btn color="primary" fab x-small dark>
        <v-icon>mdi-account-check</v-icon>
      </v-btn></v-list-item-icon
    >
  </v-list-item>
</template>

<script>
import { acceptFriend } from "@/api/friends";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async acceptFriend() {
      try {
        await acceptFriend(this.user.id);
        this.$store.commit(
          "openSnackbar",
          `${this.user.username}님의 친구요청이 수락되었습니다!`
        );
        this.$emit("removeItem", this.idx);
      } catch (error) {
        console.log(error);
      }
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
