import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#5c6bc0",
        accent: "#8c9eff",
        error: "#ff3d00",
      },
    },
  },
});
