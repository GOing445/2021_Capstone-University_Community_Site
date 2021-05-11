<template>
  <div>
    <v-subheader>마이페이지</v-subheader>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <v-avatar size="72">
            <img alt="아바타" :src="avatar" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-row dense>
            <h1 class="username">
              {{ username }}
            </h1>
          </v-row>
          <v-row dense>
            {{ email }}
          </v-row>
          <v-row dense>
            {{ stateMessage }}
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
          <v-card outlined color="secondary" dark>
            <v-card-title class="headline">친구 코드</v-card-title>
            <v-card-subtitle>
              친구들에게 공유해 친구의 시간표를 추가해 보세요!
            </v-card-subtitle>
            <v-card-text>
              <h2>내 친구 코드 : asmodo</h2>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="copyCode">복사하기</v-btn>
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
import { mapState } from "vuex";
import { logout } from "@/api/login";

export default {
  computed: {
    ...mapState(["id", "username", "stateMessage", "email", "avatar", "code"]),
  },

  methods: {
    async logoutAll() {
      try {
        this.$store.commit("openLoadingSpinner");
        this.startLoading;
        await logout();
        this.$store.commit("closeLoadingSpinner");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },

    saveUserData() {
      this.$store.commit("openSnackbar", "변경사항이 적용되었습니다!");
    },

    async copyCode() {
      try {
        this.$store.commit("openLoadingSpinner");
        const res = await navigator.clipboard.writeText(this.code);
        console.log(res);
        this.$store.commit("closeLoadingSpinner");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.username {
}
</style>
