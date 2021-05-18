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
      @click:event="showEvent"
    >
      <template v-slot:event="{ event }">
        <class-box :eventName="event.name" :classroom="event.classroom" />
      </template>
    </v-calendar>
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <selected-event
        :selectedId="selectedEvent.id"
        :selectedName="selectedEvent.name"
        :selectedStart="selectedEvent.start"
        :selectedEnd="selectedEvent.end"
        :selectedClassroom="selectedEvent.classroom"
        :selectedMemo="'123'"
        @delete-class="showDialog = true"
      />
    </v-menu>
    <Dialog
      :showDialog="showDialog"
      :selectedId="selectedEvent.id"
      :selectedName="selectedEvent.name"
      @close-dialog="showDialog = false"
      @reload="reload"
    />
  </v-sheet>
</template>
<script>
import ClassBox from "@/components/timetable/ClassBox";
import Dialog from "@/components/timetable/Dialog";
import SelectedEvent from "@/components/timetable/SelectedEvent";
import { fetchMyTimeTable } from "@/api/timetable";
import { formatDate } from "@/utils/date";

export default {
  components: { ClassBox, SelectedEvent, Dialog },

  data: () => ({
    color: ["rgba(63, 81, 181, 0.7)"],
    events: [],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    showDialog: false,
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

      for (const node of timetable) {
        const el = node[1];
        const addClass = {
          id: el.id,
          name: el.className,
          classroom: el.classroom,
          memo: el.memo,
        };
        const newDay = new Date(sunday);
        newDay.setDate(newDay.getDate() + el.day);
        addClass.start = `${formatDate(sunday)} ${el.start}`;
        addClass.end = `${formatDate(sunday)} ${el.end}`;
        this.events.push(addClass);
      }
    },

    async fetchTimetable() {
      try {
        this.$store.state.loading = true;
        const { data } = await fetchMyTimeTable();
        this.$store.state.loading = false;
        this.setEvents(data);
      } catch (error) {
        console.log(error);
      }
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },

    reload() {
      this.events = [];
      this.selectedEvent = {};
      this.selectedElement = null;
      this.selectedOpen = false;
      this.showDialog = false;
      this.fetchTimetable();
    },
  },
};
</script>
<style scoped></style>
