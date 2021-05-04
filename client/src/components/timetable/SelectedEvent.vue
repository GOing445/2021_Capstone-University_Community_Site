<template>
  <v-card min-width="350px">
    <v-toolbar color="primary" dark>
      <v-toolbar-title v-html="selectedName"> </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push('/edit_class')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="deleteClass">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <span>강의실: {{ selectedClassroom }}</span
      ><br />
      <span>시간: {{ classTime }}</span
      ><br />
      <span>메모: {{ selectedMemo }}</span
      ><br />
    </v-card-text>
  </v-card>
</template>

<script>
import { DeleteMyClass } from "@/api/timetable.js";

export default {
  props: {
    selectedId: {
      type: Number,
    },
    selectedName: {
      type: String,
    },
    selectedStart: {
      type: String,
    },
    selectedEnd: {
      type: String,
    },
    selectedClassroom: {
      type: String,
    },
    selectedMemo: {
      type: String,
    },
  },

  computed: {
    classTime() {
      return `${this.selectedStart.split(" ")[1]} ~ ${
        this.selectedEnd.split(" ")[1]
      }`;
    },
  },

  methods: {
    async deleteClass() {
      try {
        const res = await DeleteMyClass(this.selectedId);
        if (res.data.response.status === 202) {
          this.$router.replace("/main");
          this.$store.commit(
            "openSnackbar",
            `${this.selectedName} 수업이 삭제되었습니다!`
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
