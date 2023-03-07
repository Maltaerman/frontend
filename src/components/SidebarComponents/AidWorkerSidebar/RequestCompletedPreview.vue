<template>
  <ConfirmModal
    :is-bg-click-close="false"
    :is-visible="isLeaveModalVisible"
    :cancel-button-text="$t('reportTools.cancelButtonText')"
    :accept-button-text="$t('reportTools.acceptButtonText')"
    :title="$t('general.dataNotSaved')"
    :question="$t('reportTools.beforeLeaveMessage')"
    :close-func="closeLeavePageConfirmModal"
    :accept-button-func="ModalAccept"
    :cancel-button-func="ModalCancel"
  />

  <div class="overflow-y-auto h-full relative flex flex-col">
    <div
      class="bg-blue-c-500 flex flex-wrap gap-2 justify-between p-6 sticky top-0 right-0 left-0 z-50"
    >
      <p
        class="text-white text-h3 font-semibold align-middle grid content-center"
      >
        {{ $t("reportTools.makePublic") }}
      </p>
      <Button2
        class="flex flex-nowrap items-center gap-1"
        @click="SaveAndPublish"
      >
        <img src="/completed.svg" class="inline-block" />
        <p>
          {{ $t("general.publish") }}
        </p>
      </Button2>
    </div>

    <div id="RequestPreview" class="px-6 mobile:px-4 pb-4 mobile:pb-2 grow">
      <h1 class="font-semibold my-6 text-h1 mobile:text-h1-m tablet:text-h1-m">
        {{ requestedMarker.address }},
        <span v-if="requestedMarker.street_number">
          {{ requestedMarker.street_number }},
        </span>
        {{ requestedMarker.index }},
        {{ requestedMarker.city }}
      </h1>

      <h3 class="font-semibold text-h2 mobile:text-h2-m">
        {{ $t("userSideBar.general-status") }}
      </h3>

      <!--	#region  Build status v2-->
      <div class="mobile:text-h4 text-h3 mt-2 flex-col">
        <ReportStateItem
          v-for="flag of Object.keys(reportFlags)"
          :key="`report-${flag}`"
          :flag="flag"
          :description="requestedMarker.reports[flag].description"
          :flag-value="requestedMarker.reports[flag].flag"
          :update="new Date()"
        />
      </div>
      <!--	  #endRegion-->

      <router-link to="/main/submit-report">
        <button-1 v-if="isAuth" class="mt-4 w-full">
          {{ $t("userSideBar.reportButton") }}
        </button-1>
      </router-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import SVG_status_list from "../../ComponentsSVG/SVG_status_list.vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import Button2 from "../../Buttons/Button_2.vue";
import api from "../../../http_client/index.js";
import ModalTemplate from "../../Modals/ModalTemplate.vue";
import AwaitModal from "../../Modals/AwaitModal.vue";
import reportItemFlags from "../../mixins/reportItemFlags.js";
import ReportStateItem from "../UserSidebar/ReportStateItem.vue";
import Footer from "../UserSidebar/Footer.vue";

export default {
  name: "RequestCompletedPreview",
  components: {
    Footer,
    ReportStateItem,
    AwaitModal,
    ModalTemplate,
    Button2,
    SVG_status_list,
  },
  mixins: [reportItemFlags],
  data: function () {
    return {
      issueMessage: "",
      isLeaveModalVisible: false,
      isPageLeaveConfirmed: false,
      targetLeaveRef: "",
    };
  },
  computed: {
    ...mapState({
      markerReports: (state) => state.reports.selectedLocationRequest.reports,
      requestedMarker: (state) => state.reports.selectedLocationRequest,
    }),
    ...mapGetters({
      isAuth: "isAuth",
      selectedReport: "selectedReport",
      getReviewedMarkers: "getReviewedMarkers",
      getRequestMarkers: "getRequestMarkers",
    }),
    isDisabled() {
      return this.issueMessage.length < 10;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedMarker: "setSelectedMarker",
      setReviewedMarkerList: "setReviewedMarkerList",
      setUnreviewedMarkers: "setUnreviewedMarkers",
    }),
    async SaveAndPublish() {
      this.$toast.wait(this.$t("general.publishing"));
      let payload = { ...this.requestedMarker };
      /*{
				street_number : this.requestedMarker.street_number,
				address : this.requestedMarker.address,
        city : this.requestedMarker.city,
				index : this.requestedMarker.index,
			}*/

      let requestSender = this.requestedMarker.id
        ? api.locations.submitLocationReport
        : api.locations.addReportByAdmin;

      if (this.requestedMarker.id) {
        requestSender = api.locations.submitLocationReport;
        payload = {
          location_id: this.requestedMarker.id,
          ...this.requestedMarker.reports,
          ...payload,
        };
      } else {
        requestSender = api.locations.addReportByAdmin;
        payload = {
          reports: { ...this.requestedMarker.reports },
          ...payload,
        };
      }

      await requestSender(payload)
        .then((res) => {
          this.$toast.clear();
          this.setSelectedMarker(res.data);

          /*console.log(res.data)
					console.log(this.getReviewedMarkers)*/

          // Push new marker to report marker list if it needed
          if (
            !this.getReviewedMarkers.find((x) => x.location_id === res.data.id)
          ) {
            let newMapMarker = {
              location_id: res.data.id,
              position: res.data.position,
              status: res.data.status,
            };
            this.setReviewedMarkerList([
              ...this.getReviewedMarkers,
              newMapMarker,
            ]);
          }
          //
          // Remove request marker from requested markers if it there
          this.setUnreviewedMarkers(
            this.getRequestMarkers.filter((x) => x.location_id !== res.data.id)
          );
          this.$toast.success(this.$t("general.dataPublished"), {
            onClose: this.closeResultModal,
          });
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast.error(this.$t("general.errorMessage"));
          console.error(err);
        });
    },
    closeResultModal() {
      this.isPageLeaveConfirmed = true;
      this.$router.push({
        path: "/main/overview",
        query: { id: this.selectedReport.id, ...this.selectedReport.position },
      });
    },
    closeLeavePageConfirmModal() {
      this.isLeaveModalVisible = false;
    },
    ModalAccept() {
      this.isPageLeaveConfirmed = true;
      this.$router.push(this.targetLeaveRef);
    },
    ModalCancel() {
      this.isPageLeaveConfirmed = false;
      this.targetLeaveRef = "";
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.fullPath == "/main/submit-report") {
      to.params = { previewUpdating: true };
      next();
    } else if (this.isPageLeaveConfirmed) next();
    else {
      this.isLeaveModalVisible = true;
      this.targetLeaveRef = to.fullPath;
      next(false);
    }
  },
};
</script>
