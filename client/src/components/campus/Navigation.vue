<template>
  <v-bottom-navigation :value="value" color="primary">
    <v-btn @click="$router.push('/campus')">
      <span>식단표</span>
      <v-icon>mdi-food</v-icon>
    </v-btn>
    <router-link to="/campus/notice">
      <v-btn>
        <span>학사공지</span>
        <v-icon>mdi-bulletin-board</v-icon>
      </v-btn>
    </router-link>
    <router-link to="/campus/diet">
      <v-btn>
        <span>미정</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </router-link>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>

<style></style>
