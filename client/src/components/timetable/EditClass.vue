<template>
  <div>
    <v-subheader>수업 변경</v-subheader>
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
      <v-btn color="primary" dark @click="EditMyClass"> 수정 </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { fetchMyTimeTable, EditMyClass } from "@/api/timetable.js";

export default {
  data() {
    return {
      valid: true,
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
      startTime: "09 : 00",
      endTime: "09 : 00",
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

  created() {
    this.fetchMyTimeTable();
  },

  methods: {
    async fetchMyTimeTable() {
      const { data } = await fetchMyTimeTable();
      for (const event of data) {
        if (event[0] != this.$route.params.id) continue;
        const el = event[1];
        console.log(el);
        this.title = el.className;
        this.classroom = el.classroom;
        this.selectedDay = el.day;
        this.startTime = el.start;
        this.endTime = el.end;
        this.memo = el.memo;
      }
    },

    async EditMyClass() {
      await EditMyClass(this.$route.params.id, {
        className: this.title,
        classroom: this.classroom,
        day: this.selectedDay,
        start: this.startTime,
        end: this.endTime,
        memo: this.memo,
      });
    },
  },
};
</script>

<style></style>
