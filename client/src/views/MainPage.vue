<template>
  <div>
    <timetable />
    <v-btn
      color="error"
      dark
      fixed
      bottom
      right
      fab
      small
      @click="$router.push('/add_class')"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Timetable from "@/components/timetable/Timetable";

export default {
  components: { Timetable },
};
</script>
