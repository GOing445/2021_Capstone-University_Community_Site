<template>
  <v-sheet height="528">
    <v-calendar
      ref="calendar"
      type="week"
      :start="startDay"
      :weekday-format="weekName"
      :weekdays="[1, 2, 3, 4, 5]"
      :first-interval="8"
      :interval-count="15"
      :events="events"
      :event-color="eventColor"
    >
      <template v-slot:event="{ event }">
        <class-box :eventName="event.name" :classroom="event.classroom" />
      </template>
    </v-calendar>
  </v-sheet>
</template>
<script>
import ClassBox from "@/components/timetable/ClassBox";
import { fetchMyTimeTable } from "@/api/timetable";
import { formatDate } from "@/utils/date";

export default {
  components: { ClassBox },

  data: () => ({
    color: ["rgba(63, 81, 181, 0.7)"],
    events: [],
  }),

  computed: {
    startDay() {
      const today = new Date();
      if (today.getDay() === 0 || today.getDay() === 6) {
        today.setDate(today.getDate() - 2);
        return formatDate(today);
      }
      return formatDate(today);
    },
    eventColor() {
      return this.color[Math.floor(Math.random() * 1)];
    },
  },

  created() {
    this.fetchTimetable();
  },

  methods: {
    weekName(day) {
      switch (day.weekday) {
        case 0:
          return "일";
        case 1:
          return "월";
        case 2:
          return "화";
        case 3:
          return "수";
        case 4:
          return "목";
        case 5:
          return "금";
        case 6:
          return "토";
      }
    },
    setEvents(timetable) {
      const sunday = new Date();
      if (sunday.getDay() === 0) sunday.setDate(sunday.getDate() - 7);
      else sunday.setDate(sunday.getDate() - sunday.getDay());

      for (const el of timetable) {
        const addClass = { name: el.className, classroom: el.classroom };
        const newDay = new Date(sunday);
        newDay.setDate(newDay.getDate() + el.day);
        addClass.start = `${formatDate(newDay)} ${el.start}`;
        addClass.end = `${formatDate(newDay)} ${el.end}`;
        this.events.push(addClass);
      }
    },
    async fetchTimetable() {
      try {
        this.$store.state.loading = true;
        const { data } = await fetchMyTimeTable();
        this.$store.state.loading = false;
        this.setEvents(data.schedule);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
