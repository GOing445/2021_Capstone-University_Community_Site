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
	</v-sheet>
</template>
<script>
import ClassBox from '@/components/timetable/ClassBox';

import { formatDate } from '@/utils/date';

export default {
	components: { ClassBox },

	data: () => ({
		color: ['rgba(92, 107, 192, 0.7)'],
		events: [],
		timetable: [
			{
				day: 1,
				className: '빅 데이터 프로그래밍',
				classroom: '프젝3',
				start: '10:00',
				end: '12:50',
			},
			{
				day: 1,
				className: 'IoT개론 및 프로그래밍',
				classroom: '프젝1',
				start: '14:00',
				end: '16:50',
			},
			{
				day: 2,
				className: 'UML',
				classroom: '프젝3',
				start: '10:00',
				end: '12:50',
			},
			{
				day: 2,
				className: '캡스톤디자인',
				classroom: '프로3',
				start: '14:00',
				end: '16:50',
			},
			{
				day: 3,
				className: 'AI개론',
				classroom: '프젝3',
				start: '14:00',
				end: '16:50',
			},
			{
				day: 4,
				className: 'Linux 운영체제',
				classroom: '프젝2',
				start: '10:00',
				end: '12:50',
			},
			{
				day: 4,
				className: 'ERP',
				classroom: '프로2',
				start: '14:00',
				end: '16:50',
			},
			{
				day: 5,
				className: '근로',
				classroom: '원스톱지원실',
				start: '09:00',
				end: '18:00',
			},
		],
	}),

	computed: {
		startDay() {
			const today = new Date();
			if (today.getDay() === 0 || today.getDate === 6) {
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
		this.setEvents(this.timetable);
	},

	methods: {
		weekName(day) {
			switch (day.weekday) {
				case 0:
					return '일';
				case 1:
					return '월';
				case 2:
					return '화';
				case 3:
					return '수';
				case 4:
					return '목';
				case 5:
					return '금';
				case 6:
					return '토';
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
	},
};
</script>
<style scoped></style>
