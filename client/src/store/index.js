import Vue from "vue";
import Vuex from "vuex";
import { loginWithGoogle } from "@/api/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    username: "",
    stateMessage: "",
    email: "",
    avatar: "",
    code: "",
    snackbar: { state: false, message: "" },
    loading: false,
  },
  getters: {
    isLogin(state) {
      return state.id !== "";
    },
  },
  mutations: {
    openSnackbar(state, msg) {
      state.snackbar.message = msg;
      state.snackbar.state = true;
    },
    openLoadingSpinner(state) {
      state.loading = true;
    },
    closeLoadingSpinner(state) {
      state.loading = false;
    },
    setID(state, id) {
      state.id = id;
    },
    clearID(state) {
      state.id = "";
    },
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = "";
    },
    setEmail(state, email) {
      state.email = email;
    },
    clearEmail(state) {
      state.email = "";
    },
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
    clearAvatar(state) {
      state.avatar = "";
    },
    setCode(state, code) {
      state.code = code;
    },
    clearCode(state) {
      state.code = "";
    },
  },
  actions: {
    async LOGIN_WITH_GOOGLE({ commit }) {
      try {
        const { data } = await loginWithGoogle();
        if (data.user !== null) {
          const userData = data.user;
          commit("setID", userData.id);
          commit("setUsername", userData.name);
          commit("setCode", userData.invCode);
          commit("setEmail", data.google.passport.user.emails[0].value);
          commit("setAvatar", data.google.passport.user.photos[0].value);
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
