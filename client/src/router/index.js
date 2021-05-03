import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    component: () => import("@/views/MainPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/add_class",
    component: () => import("@/views/AddClassPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/edit_class",
    component: () => import("@/views/EditClassPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/SignupPage.vue"),
  },
  {
    path: "/contactus",
    component: () => import("@/views/ContactUsPage.vue"),
  },
  {
    path: "/friends",
    component: () => import("@/views/FriendsPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/friend-timetable",
    component: () => import("@/views/FriendsTimetablePage.vue"),
    meta: { auth: true },
  },
  {
    path: "/community",
    component: () => import("@/views/CommunityPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/mypage",
    component: () => import("@/views/MypagePage.vue"),
    meta: { auth: true },
  },
  {
    path: "*",
    component: () => import("@/views/NotFoundPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log("로그인이 필요합니다.");
    next("/login");
    return;
  }
  next();
});

export default router;
