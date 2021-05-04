<template>
  <v-bottom-navigation :value="value" color="primary">
    <v-btn @click="$router.push('/campus/0')">
      <span>식단표</span>
      <v-icon>mdi-food</v-icon>
    </v-btn>
    <v-btn @click="$router.push('/campus/1')">
      <span>학사공지</span>
      <v-icon>mdi-bulletin-board</v-icon>
    </v-btn>
    <v-btn @click="$router.push('/campus/2')">
      <span>미정</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
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
