<template>
  <div>
    <v-subheader>마이페이지</v-subheader>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <v-avatar size="72">
            <img alt="아바타" :src="$store.state.avatar" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-row dense>
            <h1 class="username">
              {{ $store.state.username }}
            </h1>
          </v-row>
          <v-row dense>
            {{ $store.state.email }}
          </v-row>
          <v-row dense>
            {{ $store.state.stateMessage }}
          </v-row>
        </v-col>
        <v-col cols="2">
          <v-btn
            color="primary"
            width="50"
            height="50"
            outlined
            @click="logoutAll"
            >로그아웃</v-btn
          >
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="headline"> Unlimited music now </v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text> Listen Now </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      color="error"
      dark
      fixed
      bottom
      right
      fab
      small
      @click="saveUserData"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
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
    saveUserData() {
      this.$store.commit("openSnackbar", "변경사항이 적용되었습니다!");
    },
  },
};
</script>

<style scoped>
.username {
}
</style>
