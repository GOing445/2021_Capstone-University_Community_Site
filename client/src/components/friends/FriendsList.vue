<template>
	<v-list subheader>
		<v-subheader>친구 시간표</v-subheader>
		<v-list-item-group v-model="selectedUser">
			<template v-for="(user, idx) in users">
				<list-item :user="user" :key="idx" />
				<v-divider v-if="idx < users.length" :key="idx"></v-divider>
			</template>
		</v-list-item-group>
	</v-list>
</template>

<script>
import ListItem from '@/components/friends/ListItem';

export default {
	components: { ListItem },
	data: () => ({
		selectedUser: null,
		users: [
			{
				avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
				title: '김수빈',
			},
			{
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
	}),
};
</script>

<style></style>
