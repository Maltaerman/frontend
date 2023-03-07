import { mapGetters } from "vuex";

export default {
  methods: {
    isPathMatched(url) {
      return this.$route.matched.some((x) => x.path === url);
    },
    GetPathParam(paramName) {
      return this.$route.params[paramName] ?? undefined;
    },
  },
  computed: {
    ...mapGetters({
      mapCenter: "getMapCenter",
    }),
  },
};
