<template>
	<v-list-item :key="user.title">
		<v-list-item-avatar>
			<v-img :alt="`${user.title} avatar`" :src="user.avatar"></v-img>
		</v-list-item-avatar>
		<v-list-item-content @mousedown.right="clickRightUser($event)">
			<v-list-item-title v-text="user.title"></v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	methods: {
		clickRightUser(e) {
			e.preventDefault();
			alert('우클릭');
		},
	},
};
</script>

<style></style>
