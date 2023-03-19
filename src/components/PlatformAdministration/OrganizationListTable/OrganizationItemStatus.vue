<template>
  <div>
    <div
      class="flex flex-row bg-white rounded-lg max-w-max border px-2 py-0.5"
      :class="getOrganizationStatus()"
    >
      <div
        v-if="status === ORGANIZATION_STATUSES?.DISABLED"
        class="h-5 w-5 mr-1 top-0.5 relative inline-block border-green-c-200"
      >
        <SVG_eye_crossed class="fill-green-c-500"></SVG_eye_crossed>
      </div>
      <span class="capitalize"> {{ getStatusTranslate }}</span>
    </div>
  </div>
</template>

<script>
import SVG_eye_crossed from "../../ComponentsSVG/Icons/SVG_eye_crossed.vue";
import { ORGANIZATION_STATUSES } from "../constants";
export default {
  name: "OrganizationItemStatus",
  components: {
    SVG_eye_crossed,
  },
  data() {
    return {
      ORGANIZATION_STATUSES,
    };
  },
  props: {
    status: {
      type: String,
      default: "",
    },
  },
  methods: {
    getOrganizationStatus() {
      const { ACTIVE, PENDING, DISABLED } = this.ORGANIZATION_STATUSES;
      switch (this.status) {
        case ACTIVE:
          return "border-green-c-200 text-green-c-500";
        case PENDING:
          return "border-gray-c-200 text-gray-c-500";
        case DISABLED:
          return "border-gray-c-300 text-gray-c-500 fill-gray-c-200";
        default:
          break;
      }
    },
  },
  computed: {
    getStatusTranslate() {
      const { ACTIVE, PENDING, DISABLED } = this.ORGANIZATION_STATUSES;
      let status = this.$t("general.error");
      switch (this.status) {
        case ACTIVE:
          status = this.$t("general.active");
          break;
        case PENDING:
          status = this.$t("general.pending");
          break;
        case DISABLED:
          status = this.$t("general.disabled");
          break;
        default:
          break;
      }
      return status;
    },
  },
};
</script>

<style lang="scss" scoped></style>
