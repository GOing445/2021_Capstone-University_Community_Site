<template>
	<v-app>
		<app-header />
		<router-view id="app-body" />
	</v-app>
</template>

<script>
import AppHeader from '@/components/common/AppHeader';

export default {
	components: {
		AppHeader,
	},
	created() {
		this.$router.replace('/');
	},
};
</script>

<style>
html {
	width: 500px;
	height: 600px;
}

#app-body {
	height: 528px;
}
</style>
