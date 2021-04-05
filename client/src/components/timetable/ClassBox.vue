<template>
	<div class="class_box">
		<div>{{ eventName }}</div>
		<div class="classroom">{{ classroom }}</div>
	</div>
</template>

<script>
export default {
	props: {
		eventName: {
			type: String,
			required: true,
		},
		classroom: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped>
.class_box {
	white-space: normal;
	word-break: break-all;
	padding: 0 0.2rem 0 0.3rem;
}

.classroom {
	font-size: 3px;
}
</style>
