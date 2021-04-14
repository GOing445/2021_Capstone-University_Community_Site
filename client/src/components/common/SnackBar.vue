<template>
  <v-snackbar v-model="$store.state.snackbar.state" timeout="2000">
    {{ $store.state.snackbar.message }}
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    text: "My timeout is set to 2000.",
  }),
};
</script>

<style></style>
