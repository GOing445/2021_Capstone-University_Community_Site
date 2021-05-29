<template>
  <v-app>
    <app-header />
    <transition name="page" mode="out-in">
      <router-view id="app-body" :key="$route.fullPath" />
    </transition>
    <snack-bar />
    <overlay-loading />
  </v-app>
</template>

<script>
import AppHeader from "@/components/common/AppHeader";
import SnackBar from "@/components/common/SnackBar.vue";
import OverlayLoading from "@/components/common/OverlayLoading.vue";

export default {
  components: {
    AppHeader,
    SnackBar,
    OverlayLoading,
  },
  async created() {
    try {
      await this.$store.dispatch("LOGIN_WITH_GOOGLE");
      await this.$router.replace("/");
    } catch (error) {
      console.log(error);
    }
    // 여기는 서버 에러 페이지
    // this.$router.replace("/");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700;900&display=swap");

* {
  font-family: "Noto Sans KR", sans-serif;
}

html {
  width: 500px;
  height: 600px;
}

#app-body {
  height: 528px;
  overflow-y: scroll;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
