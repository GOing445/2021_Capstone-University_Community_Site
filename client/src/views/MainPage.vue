<template>
	<div>
		<timetable />
		<v-btn color="error" dark fixed bottom right fab small>
			<v-icon @click="$router.push('/add_class')">mdi-plus</v-icon>
		</v-btn>
	</div>
</template>

<script>
import Timetable from '@/components/timetable/Timetable';

export default {
	components: { Timetable },
};
</script>
