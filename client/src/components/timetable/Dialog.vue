<template>
  <v-dialog v-model="showDialog" max-width="290">
    <v-card>
      <v-card-title class="headline"> 수업 삭제 </v-card-title>
      <v-card-text> {{ selectedName }}수업을 지우시겠습니까? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="$emit('close-dialog')">
          취소
        </v-btn>
        <v-btn color="error" text @click="deleteClass"> 삭제 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DeleteMyClass } from "@/api/timetable.js";

export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    selectedId: {
      type: Number,
    },
    selectedName: {
      type: String,
    },
  },

  methods: {
    async deleteClass() {
      try {
        this.$emit("close-dialog");
        this.$store.commit("openLoadingSpinner");
        const { data } = await DeleteMyClass(this.selectedId);
        this.$store.commit("closeLoadingSpinner");
        if (data.response.status === 202) {
          this.$store.commit(
            "openSnackbar",
            `${this.selectedName} 수업이 삭제되었습니다!`
          );
          this.$emit("reload");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
