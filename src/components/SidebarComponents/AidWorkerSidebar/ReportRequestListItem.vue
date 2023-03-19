<template>
  <div
    class="shadow-cs3 p-4 rounded-lg mb-4 relative"
    :class="{
      'bg-blue-c-100': isSelected,
      'border border-red-c-500': isExpired,
    }"
  >
    <div>
      <div class="flex justify-between mb-3">
        <div class="text-h4 text-gray-c-500">
          <span v-if="!isExpired" class="capitalize">
            {{ GetDayDateString(locationRequest.created_at) }}
          </span>
          <span v-else class="text-red-c-500">
            {{ $t("aidWorkerSideBar.expireIn", { hours: expireInHours }) }}
          </span>
        </div>
        <div class="text-h4 text-gray-c-500">
          {{ locationRequest.city }}
          <img src="/Marker-gray.svg" class="inline-block" />
          {{
            locationRequest.distance
              ? locationRequest.distance.toFixed(0) + " km"
              : $t("general.unknown")
          }}
        </div>
      </div>
      <div
        class="text-h3 text-blue-c-500 font-semibold pb-2 shadow-cs2 cursor-pointer"
        @click="setSelectedRequest(locationRequest)"
      >
        <img src="/Marker-blue.svg" class="inline-block mr-1" />
        {{ markerAddress }}
      </div>
      <div class="flex justify-between mt-4 items-baseline">
        <div>
          <button-1 @click="this.Reporting">
            {{ $t("aidWorkerSideBar.takeRequest") }}
          </button-1>
          <button-2
            v-if="isMyRequest && itemUsageTabName === 'myRequestsList'"
            class="ml-3"
            @click="RemoveFromMyRequests"
          >
            {{ $t("general.delete") }}
          </button-2>
        </div>

        <button-text-1
          @click="AddToMyRequests"
          v-if="!isMyRequest && itemUsageTabName === 'requestsList'"
        >
          {{ $t("aidWorkerSideBar.addToMyList") }}
        </button-text-1>

        <div
          v-else-if="isMyRequest && itemUsageTabName === 'requestsList'"
          class="text-h3 font-medium text-blue-c-500 p-2"
        >
          <img src="/completed2.svg" class="inline-block mr-2" />
          {{ $t("aidWorkerSideBar.myRequest") }}
        </div>
      </div>
    </div>
    <Loader v-if="isLoaderVisible" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import api from "../../../http_client/index.js";
import Loader from "../../Loader.vue";
import dateFormatter from "../../mixins/dateFormatter.js";

export default {
  name: "ReportRequestListItem",
  components: { Loader },
  emits: ["remove-from-my-list", "add-to-my-list"],
  mixins: [dateFormatter],
  props: {
    locationRequest: {
      type: Object,
      required: true,
    },
    itemUsageTabName: {
      type: String,
      default: "requestsList",
      validator: function (value) {
        return ["requestsList", "myRequestsList"].includes(value);
      },
    },
  },
  data() {
    return {
      isLoaderVisible: false,
      expireInHours: 2,
    };
  },
  methods: {
    ...mapActions(["setSelectedRequest"]),
    Reporting() {
      this.setSelectedRequest(this.locationRequest);
      this.$router.push("/main/submit-report");
    },
    async AddToMyRequests() {
      this.isLoaderVisible = true;
      await api.locations
        .assignRequest(this.locationRequest.id)
        .then((res) => {
          this.$emit("add-to-my-list", res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoaderVisible = false;
        });
    },
    async RemoveFromMyRequests() {
      this.isLoaderVisible = true;
      await api.locations
        .removeAssignRequest(this.locationRequest.id)
        .then((res) => {
          this.$emit("remove-from-my-list", res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoaderVisible = false;
        });
    },
  },
  computed: {
    ...mapState({
      selectedLocationRequest: (state) => state.reports.selectedLocationRequest,
      AidWorker: (state) => state.user.loggedUserInfo,
    }),
    isSelected() {
      if (!this.selectedLocationRequest || !this.locationRequest) return false;
      else return this.locationRequest.id === this.selectedLocationRequest.id;
    },
    isMyRequest() {
      return this.locationRequest.reported_by === this.AidWorker.id;
    },
    markerAddress() {
      let address = "";
      if (this.locationRequest.address)
        address += `${this.locationRequest.address}, `;
      if (this.locationRequest.street_number)
        address += `${this.locationRequest.street_number}, `;
      /*if(this.locationRequest.index)
        address += `${this.locationRequest.index}, `*/
      if (this.locationRequest.city) address += `${this.locationRequest.city}`;
      let trim = 0;
      for (let i = address.length - 1; i <= 0; i--) {
        if (address[i] === " " || address[i] === ",") trim++;
        else break;
      }
      address = address.substring(0, address.length - trim);
      return address.length > 0 ? address : this.$t("general.error");
    },
    // is request remove from "My request" in 2 hours
    isExpired() {
      let result = false;
      if (
        this.locationRequest.reported_by &&
        this.locationRequest.report_expires
      ) {
        return (
          this.GetDate(this.locationRequest.report_expires) -
            this.GetDate(Date.now()) <=
          this.expireInHours * 3600000
        );
      }
      return result;
    },
  },
  mounted() {
    //console.log(this.locationRequest)
  },
};
</script>

<style scoped></style>
