<template>
  <div>
    <v-avatar size="62">
      <img alt="아바타" :src="$store.state.avatar" />
    </v-avatar>
    <v-btn color="primary" @click="logoutAll">로그아웃</v-btn>
  </div>
</template>

<script>
import { logout } from "@/api/login";

export default {
  methods: {
    async logoutAll() {
      try {
        await logout();
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
