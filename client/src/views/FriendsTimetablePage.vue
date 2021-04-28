<template>
  <div>
    <timetable />
    <v-btn color="error" dark fixed bottom right fab small>
      <v-icon @click="$router.go(-1)">mdi-arrow-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Timetable from "@/components/friends/Timetable";
export default {
  components: { Timetable },
};
</script>

<style></style>
