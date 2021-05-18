<template>
  <div>
    <dietary-table v-show="value === 0 || value === 2" />
    <notice-list v-show="value === 1" />
    <v-bottom-navigation v-model="value" color="primary">
      <v-btn>
        <span>식단표</span>
        <v-icon>mdi-food</v-icon>
      </v-btn>
      <v-btn>
        <span>학사공지</span>
        <v-icon>mdi-bulletin-board</v-icon>
      </v-btn>
      <v-btn>
        <span>미정</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import DietaryTable from "@/components/campus/DietaryTable";
import NoticeList from "@/components/campus/NoticeList";
export default {
  components: {
    DietaryTable,
    NoticeList,
  },
  data() {
    return {
      value: 1,
    };
  },
};
</script>

<style scoped></style>
