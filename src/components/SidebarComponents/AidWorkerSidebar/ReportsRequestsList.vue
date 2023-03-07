<template>
  <div ref="viewport" class="p-6">
    <ReportRequestListItem
      v-for="item in unreviewedMarkers"
      v-if="unreviewedMarkers.length > 0"
      :key="`request${item.id}`"
      :location-request="item"
      item-usage-tab-name="requestsList"
      @add-to-my-list="OnAddToMyList"
    />
    <div v-else class="mt-6 text-center text-h3 text-gray-c-800">
      {{ $t("aidWorkerSideBar.allListEmpty") }}
    </div>
    <div v-if="pageMax < 0" ref="scrollObserver" class="relative h-[80px]">
      <Loader v-show="isLoaderVisible" />
    </div>
  </div>
</template>

<script>
import ReportRequestListItem from "./ReportRequestListItem.vue";
import api from "../../../http_client/index.js";
import { mapGetters } from "vuex";
import Loader from "../../Loader.vue";

export default {
  name: "ReportsRequestsList",
  components: {
    ReportRequestListItem,
    Loader,
  },
  props: {
    unreviewedMarkers: {
      type: Array,
      default: [],
    },
    page: {
      type: Number,
      default: 0,
    },
    pageMax: {
      type: Number,
      default: -1,
    },
    isLoaderVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["next-page", "add-to-my-list"],
  data() {
    return {
      /*unreviewedMarkers: [],
			page: 0,
			pageMax: -1,
			isLoaderVisible : false*/
    };
  },
  mounted() {
    let options = {
      threshold: 0,
    };
    let callback = (entries, observer) => {
      if (
        entries[0].isIntersecting &&
        !this.isLoaderVisible &&
        this.pageMax < 0
      ) {
        this.GetNextPage();
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.scrollObserver);
  },
  methods: {
    GetNextPage() {
      this.$emit("next-page");
    },
    OnAddToMyList(req) {
      this.$emit("add-to-my-list", req);
    },
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
};
</script>

<style scoped></style>
