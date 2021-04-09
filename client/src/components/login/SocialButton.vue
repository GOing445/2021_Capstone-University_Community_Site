<template>
  <v-btn large width="300" :color="backgroundColor" class="mb-5">
    <v-row>
      <v-col cols="1">
        <v-avatar size="20">
          <v-img :src="require(`@/assets/social/${img}.png`)" />
        </v-avatar>
      </v-col>
      <v-col>
        <span :class="textColor">{{ text }}</span>
      </v-col>
    </v-row>
  </v-btn>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
span {
  font-weight: bold;
  line-height: 20px;
}
</style>
