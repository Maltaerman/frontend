<template>
  <div class="h-full flex flex-col justify-between">
		<div id="Overview" class="px-6 mobile:px-4 pb-6 mobile:pb-2">
			<h3 class="font-semibold text-h2
				mobile:text-h2-m">
				{{ $t('userSideBar.general-status') }}
			</h3>
<!--	#region  Build status v2-->
      <div class="mobile:text-h4 text-h3">
        <ReportStateItem v-for="flag of Object.keys(reportFlags)"
                         :flag="flag" :flag-value="selectedMarker.reports[flag].flag"
                         :description="selectedMarker.reports[flag].description"
                         :update="selectedMarker.updated_at"/>
      </div>
<!--      #endregion-->

			<button-1 v-if="isAuth" class="mt-4 w-full" @click="UpdateSelectedMarkerReports">
        {{ $t('userSideBar.reportButton') }}
			</button-1>
		</div>
		<Footer/>
  </div>
</template>

<script>
import SVG_status_list from "../../ComponentsSVG/SVG_status_list.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import Expander from "../../Other/Expander.vue";
import reportItemFlags from "../../mixins/reportItemFlags.js";
import ReportStateItem from "./ReportStateItem.vue";
import Footer from "./Footer.vue";


export default {
  name: "Overview",
  components: {
		Footer,
    ReportStateItem,
		Expander,
		SVG_status_list,
  },
  mixins : [reportItemFlags],
  data : function () {
	  return {
	    issueMessage: "",
	    isModalView : false
	  }
  },
  computed : {
		...mapState({
			markerReports: state => state.selectedMarkerData.reports,
			selectedMarker: state => state.selectedMarkerData,
		}),
		...mapGetters(["isAuth"]),
	  isDisabled(){
	    return this.issueMessage.length < 10;
	  },
  },
  methods : {
		...mapActions(["setSelectedRequest"]),
		UpdateSelectedMarkerReports(){
			this.setSelectedRequest(this.selectedMarker);
			this.$router.push("/main/submit-report");
		},
  }
}
</script>

<style scoped>

</style>
