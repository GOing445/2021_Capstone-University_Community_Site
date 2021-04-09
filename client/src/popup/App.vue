<template>
  <div>
    {{ oauth }}

    <button @click="go"></button>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      oauth: null,
    };
  },
  created() {
    // const { data } = await axios.get("http://nisuwainc.cafe24app.com/session");
    // this.oauth = data;
  },

  methods: {
    async go() {
      var port = chrome.extension.connect({
        name: "Sample Communication",
      });
      port.postMessage("Hi BackGround");
      port.onMessage.addListener(function (msg) {
        console.log("message recieved" + msg);
      });
    },
  },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
