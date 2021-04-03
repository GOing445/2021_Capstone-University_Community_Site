<template>
	<v-sheet height="528">
		<v-calendar
			ref="calendar"
			start="1999-01-01"
			type="week"
			:weekday-format="weekName"
			:weekdays="[1, 2, 3, 4, 5]"
			:first-interval="8"
			:interval-count="15"
			:events="events"
			@click:event="showEvent"
		>
			<template v-slot:event="{ event }">
				<div class="fill-height pl-2">{{ event.name }}</div>
			</template>
		</v-calendar>
		<v-menu
			v-model="selectedOpen"
			:close-on-content-click="false"
			:activator="selectedElement"
			offset-x
		>
			<v-card color="grey lighten-4" min-width="350px" flat>
				<v-toolbar :color="selectedEvent.color" dark>
					<v-btn icon>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
					<v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-text>
					<span v-html="selectedEvent.details"></span>
				</v-card-text>
				<v-card-actions>
					<v-btn text color="secondary" @click="selectedOpen = false">
						닫기
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-menu>
	</v-sheet>
</template>
<script>
export default {
	data: () => ({
		value: '',
		weekdays: [1, 2, 3, 4, 5],
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		events: [
			{
				name: '안녕하세요',
				start: '2021-04-01 09:00',
				end: '2021-04-01 10:00',
				color: 'red',
			},
			{
				name: '하이루루루루루루루루루루',
				start: '2021-04-01 12:30',
				end: '2021-04-01 15:30',
			},
		],
	}),

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
	},
};
</script>
<style></style>
