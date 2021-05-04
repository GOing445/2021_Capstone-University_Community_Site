<template>
  <v-card min-width="350px">
    <v-toolbar color="primary" dark>
      <v-toolbar-title v-html="selectedName"> </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push('/edit_class')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon>
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
      type: String,
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
};
</script>

<style></style>
