<template>
  <div>
    <v-subheader>수업 추가</v-subheader>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-text-field
              v-model="title"
              :rules="titleRules"
              :counter="10"
              prepend-icon="mdi-notebook-multiple"
              label="과목명(필수)"
              single-line
              required
              dense
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="classroom"
              :rules="classroomRules"
              :counter="10"
              prepend-icon="mdi-google-classroom"
              label="강의실"
              single-line
              dense
            ></v-text-field>
          </v-row>
          <v-row dense>
            <v-chip-group
              mandatory
              active-class="primary--text"
              v-model="selectedDay"
            >
              <v-chip v-for="day in weekday" :key="day">
                {{ day }}
              </v-chip>
            </v-chip-group>
          </v-row>
          <v-row dense>
            <v-col cols="4">
              <v-select
                v-model="startTime"
                :items="timeItem"
                label="시작시간"
                :full-width="false"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="endTime"
                :items="timeItem"
                label="끝시간"
                :full-width="false"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row dense>
            <v-textarea
              v-model="memo"
              height="150"
              label="메모"
              :counter="100"
              :rules="memoRules"
              filled
              no-resize
              required
            ></v-textarea>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" dark @click="$router.go(-1)"> 취소 </v-btn>
      <v-btn color="primary" dark @click="addClass"> 등록 </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { PostMyClass } from "@/api/timetable.js";

export default {
  data() {
    return {
      valid: false,
      title: "",
      classroom: "",
      weekday: ["월", "화", "수", "목", "금"],
      selectedDay: 0,
      timeItem: [
        { text: "09:00" },
        { text: "10:00" },
        { text: "11:00" },
        { text: "12:00" },
        { text: "13:00" },
        { text: "14:00" },
        { text: "15:00" },
        { text: "16:00" },
        { text: "17:00" },
        { text: "18:00" },
        { text: "19:00" },
        { text: "20:00" },
        { text: "21:00" },
        { text: "22:00" },
      ],
      startTime: "09:00",
      endTime: "09:00",
      memo: "",
      titleRules: [
        (v) => !!v || "과목명을 입력해주세요",
        (v) => (v && v.length <= 10) || "과목명은 10자 이내여야 합니다.",
      ],
      classroomRules: [
        (v) => v.length <= 10 || "강의실 이름은 10자 이내여야 합니다.",
      ],
      memoRules: [(v) => v.length <= 100 || "메모는 100자 이내여야 합니다."],
    };
  },

  methods: {
    async addClass() {
      if (this.$refs.form.validate()) {
        const classData = {
          className: this.title,
          classroom: this.classroom,
          day: this.selectedDay + 1,
          start: this.startTime,
          end: this.endTime,
          memo: this.memo,
        };
        try {
          const res = await PostMyClass(classData);
          if (res.data.response.status === 202) {
            this.$router.push("/main");
            this.$store.commit("openSnackbar", "새로운 수업이 등록되었습니다!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style></style>
