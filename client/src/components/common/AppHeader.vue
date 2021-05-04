<template>
  <v-tabs background-color="#5C6BC0" dark icons-and-text grow centered>
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab @click="$router.push('/main')">
      내 시간표
      <v-icon tag="span">📆</v-icon>
    </v-tab>

    <v-tab @click="$router.push('/friends')">
      친구 시간표
      <v-icon tag="span">👪</v-icon>
    </v-tab>

    <v-tab @click="$router.push('/campus')">
      캠퍼스
      <v-icon tag="span">🏫</v-icon>
    </v-tab>

    <v-tab @click="$router.push('/mypage')">
      마이페이지
      <v-icon tag="span">🙂</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {};
</script>

<style></style>
