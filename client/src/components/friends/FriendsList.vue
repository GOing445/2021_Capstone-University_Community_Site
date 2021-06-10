<template>
  <v-list subheader>
    <v-subheader>친구 시간표</v-subheader>
    <template v-for="(user, idx) in users">
      <list-item :user="user" :key="user.id" @click-menu="showMenuList" />
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
            <v-btn color="error" small text @click="deleteFriend">
              {{ item.title }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      color="error"
      dark
      fixed
      bottom
      right
      fab
      small
      @click="dialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline"> 친구 추가 </v-card-title>

        <v-card-text>
          <p class="mb-3">
            추가하고 싶은 친구의 <strong>이름</strong>과
            <strong>친구 코드</strong>를 입력해주세요!
          </p>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              prepend-icon="mdi-account"
              label="친구 이름"
              single-line
              required
              dense
            ></v-text-field>
            <v-text-field
              v-model="invCode"
              :rules="invCodeRules"
              prepend-icon="mdi-badge-account"
              label="친구 코드"
              single-line
              dense
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> 닫기 </v-btn>
          <v-btn color="success" text @click="requestFriend" :disabled="!valid">
            요청
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
import ListItem from "@/components/friends/ListItem";

import {
  fetchFriendsList,
  requestFriend,
  deleteFriend,
} from "@/api/friends.js";

export default {
  components: { ListItem },
  data: () => ({
    dialog: false,
    users: [],
    showMenu: false,
    x: 0,
    y: 0,
    selectedId: 0,
    items: [{ title: "친구삭제" }],
    valid: false,
    username: "",
    usernameRules: [(v) => !!v || "친구 이름을 입력해주세요"],
    invCode: "",
    invCodeRules: [(v) => !!v || "친구 코드를 입력해주세요"],
  }),

  created() {
    this.fetchFriendsList();
  },

  methods: {
    showMenuList(pos) {
      this.showMenu = false;
      this.x = pos.x;
      this.y = pos.y;
      this.selectedId = pos.id;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },

    async fetchFriendsList() {
      try {
        const { data } = await fetchFriendsList();
        this.users = data;
      } catch (error) {
        console.log(error);
      }
    },

    async requestFriend() {
      if (!this.$refs.form.validate()) return;
      try {
        await requestFriend(this.username, this.invCode);
        this.$store.commit("openSnackbar", "친구 요청이 완료되었습니다!");
        this.dialog = false;
      } catch ({ response }) {
        if (response.status === 406) {
          this.$store.commit("openSnackbar", response.data.response.desc);
        } else {
          this.$store.commit("openSnackbar", "에러!");
        }
      }
    },

    async deleteFriend() {
      try {
        await deleteFriend(this.selectedId);
        this.$store.commit("openSnackbar", "친구 삭제가 완료되었습니다!");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
