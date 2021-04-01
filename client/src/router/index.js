import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/main',
	},
	{
		path: '/main',
		component: () => import('@/views/MainPage.vue'),
	},
	{
		path: '/add_class',
		component: () => import('@/views/AddClassPage.vue'),
	},
	{
		path: '/login',
		component: () => import('@/views/LoginPage.vue'),
	},
	{
		path: '/signup',
		component: () => import('@/views/SignupPage.vue'),
	},
	{
		path: '/friends',
		component: () => import('@/views/FriendsPage.vue'),
	},
	{
		path: '*',
		component: () => import('@/views/NotFoundPage.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
