<template>
  <router-view></router-view>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      UpdateRequestCountTimeout: 300000,
    };
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  methods: {
    ...mapActions(["getRequestsCount"]),
    ...mapGetters(["getLocalization"]),
    UpdateRequestCount() {
      if (this.isAuth) {
        this.getRequestsCount();
        setTimeout(this.UpdateRequestCount, this.UpdateRequestCountTimeout);
      }
    },
  },
  watch: {
    isAuth: function (newValue) {
      this.UpdateRequestCount();
    },
  },
  created() {
    this.UpdateRequestCount();
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
* {
  font-family: "Inter", sans-serif;
}
</style>
