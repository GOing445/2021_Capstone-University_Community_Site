<template>
  <v-overlay :value="$store.state.loading">
    <v-progress-circular indeterminate size="70" :width="7" color="amber">
    </v-progress-circular>
  </v-overlay>
</template>

<script>
export default {};
</script>

<style></style>
