<template>
	<v-app>
		<app-header />
		<transition name="page" mode="out-in">
			<router-view id="app-body" />
		</transition>
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

.page-enter-active,
.page-leave-active {
	transition: opacity 0.5s, transform 0.5s;
}
.page-enter,
.page-leave-to {
	opacity: 0;
	transform: translateX(-30%);
}
</style>
