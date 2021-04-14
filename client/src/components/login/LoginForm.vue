<template>
  <v-container fill-height fluid class="login_form">
    <v-row align="center" justify="center">
      <v-col align="center">
        <v-img
          :src="require('@/assets/logo.png')"
          class="mb-5"
          contain
          height="100"
        />
        <v-card outlined max-width="400" height="330">
          <h1 class="grey--text text--darken-3 mt-4">로그인</h1>
          <p class="grey--text text--darken-1 mb-6">
            기존에 사용하시는 계정으로 간단하게 로그인하세요.
          </p>
          <social-button
            v-for="button in socialButtons"
            :key="button.text"
            :backgroundColor="button.backgroundColor"
            :textColor="button.textColor"
            :text="button.text"
            :img="button.img"
            :loginURL="button.loginURL"
          />
          <div>
            <router-link to="/signup">회원가입</router-link> |
            <router-link to="/contactus">문의하기</router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SocialButton from "@/components/login/SocialButton";
import axios from "axios";

export default {
  components: { SocialButton },
  data() {
    return {
      socialButtons: [
        {
          text: "네이버 아이디로 로그인",
          backgroundColor: "#1ec800",
          textColor: "white--text",
          img: "naver",
          loginURL: "http://nisuwainc.cafe24app.com/auth/google",
        },
        {
          text: "카카오 아이디로 로그인",
          backgroundColor: "#fee500",
          textColor: "brown--text text--darken-4",
          img: "kakao",
          loginURL: "http://nisuwainc.cafe24app.com/auth/google",
        },
        {
          text: "구글 아이디로 로그인",
          backgroundColor: "#dc4335",
          textColor: "white--text",
          img: "google",
          loginURL: "http://nisuwainc.cafe24app.com/auth/google",
        },
      ],
    };
  },
  async created() {
    try {
      const { data } = await axios.get(
        "http://nisuwainc.cafe24app.com/api/test1"
      );
      console.log(data.schedule);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
