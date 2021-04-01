<template>
	<v-list subheader>
		<v-subheader>친구 시간표</v-subheader>
		<template v-for="(chat, idx) in recent">
			<v-list-item :key="chat.title">
				<v-list-item-avatar>
					<v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title v-text="chat.title"></v-list-item-title>
				</v-list-item-content>

				<v-list-item-icon>
					<v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">
						mdi-message-outline
					</v-icon>
				</v-list-item-icon>
			</v-list-item>

			<v-divider v-if="idx < recent.length" :key="idx"></v-divider>
		</template>
	</v-list>
	<!-- 
	<v-divider></v-divider>

	<v-list subheader>
		<v-subheader>Previous chats</v-subheader>

		<v-list-item v-for="chat in previous" :key="chat.title">
			<v-list-item-avatar>
				<v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title v-text="chat.title"></v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list> -->
</template>

<script>
export default {
	data: () => ({
		recent: [
			{
				active: true,
				avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
				title: '김수빈',
			},
			{
				active: true,
				avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
				title: '박호성',
			},
			{
				avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
				title: '이연권',
			},
			{
				avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
				title: '최두영',
			},
		],
		previous: [
			{
				title: 'Travis Howard',
				avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
			},
		],
	}),
};
</script>

<style></style>
