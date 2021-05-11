<template>
  <div>
    <router-view />
    <navigation />
  </div>
</template>

<script>
import Navigation from "@/components/campus/Navigation";

export default {
  components: {
    Navigation,
  },
};
</script>

<style scoped></style>
