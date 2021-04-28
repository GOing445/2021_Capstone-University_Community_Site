<template>
  <div>
    <mypage-form />
    <v-btn color="error" dark fixed bottom right fab small>
      <v-icon @click="saveUserData">mdi-content-save</v-icon>
    </v-btn>
  </div>
</template>

<script>
import MypageForm from "@/components/mypage/MypageForm.vue";

export default {
  components: { MypageForm },
  methods: {
    saveUserData() {
      alert("저장되었습니다");
    },
  },
};
</script>

<style></style>
