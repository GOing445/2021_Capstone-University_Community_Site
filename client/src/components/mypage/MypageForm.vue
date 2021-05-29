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
      <v-row>
        <v-col col="12">
          <v-card outlined>
            <v-card-text>
              <p>친구들에게 공유해 친구의 시간표를 추가해 보세요!</p>
              <h2>내 친구 코드 : {{ code }}</h2>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="copyCode">복사하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <v-card outlined>
            <v-card-text>
              <p>친구 요청 목록</p>
              <template v-for="(user, idx) in users">
                <list-item
                  :user="user"
                  :key="user.title"
                  @click-menu="showMenuList"
                />
                <v-divider v-if="idx < users.length" :key="idx"></v-divider>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="copyCode">모두 수락하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-btn
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
    </v-btn> -->
  </div>
</template>

<script>
import ListItem from "@/components/mypage/ListItem";

import { mapState } from "vuex";
import { logout } from "@/api/login";
import { fetchWaitingFriends } from "@/api/friends";

export default {
  components: {
    ListItem,
  },

  data() {
    return {
      users: [{ title: "title", avatar: "test", status: "test" }],
    };
  },

  computed: {
    ...mapState(["id", "username", "stateMessage", "email", "avatar", "code"]),
  },

  async created() {
    const { data } = await fetchWaitingFriends(this.code);
    console.log(data);
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
        await navigator.clipboard.writeText(this.code);
        this.$store.commit("openSnackbar", "친구 코드가 복사되었습니다!");
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
