<template>
  <v-card min-width="350px">
    <v-toolbar color="primary" dark>
      <v-toolbar-title v-html="selectedName"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push(`/edit_class/${selectedId}`)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('delete-class')">
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
      default: "2021-05-04 09:00",
    },
    selectedEnd: {
      type: String,
      default: "2021-05-04 09:00",
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
};
</script>

<style></style>
