<template>
	<div class="px-6 relative">
		<ReportRequestListItem v-if="myUnreviewedMarkers.length > 0"
			v-for="item in myUnreviewedMarkers"
			:key="`request${item.id}`"
			:location-request="item"
			itemUsageTabName="myRequestsList"
			@remove-from-my-list="OnRemoveFromMyList"
		/>
		<div v-else class="mt-6 text-center text-h3 text-gray-c-800">
      {{ $t('aidWorkerSideBar.myListEmpty') }}
		</div>
		<Loader v-show="isLoaderVisible"/>
	</div>
</template>

<script>
import ReportRequestListItem from "./ReportRequestListItem.vue";
import Loader from "../../Loader.vue";
import api from "../../../http_client/index.js";
import {mapGetters} from "vuex";

export default {
	name: "MyReportRequestList",
	components: {
		ReportRequestListItem,
		Loader
	},
	data(){
		return {
			myUnreviewedMarkers: [],
			isLoaderVisible : false
		}
	},
	methods : {
		async GetMyReportsRequest(){
			if(!this.isAuth)
				return;
			this.isLoaderVisible = true;
			await api.locations.getAssignedRequests().then(res=>{
					this.myUnreviewedMarkers = res.data;
				}).catch(err=>{
					this.$toast.error(this.$t("general.errorMessage"))
					alert(err);
				}).finally(()=>{
					this.isLoaderVisible = false
				})
		},
		OnRemoveFromMyList(locationId){
			this.myUnreviewedMarkers = this.myUnreviewedMarkers
				.filter(el=>el.id!==locationId)
		}
	},
	computed : {
		...mapGetters(["isAuth"])
	},
	mounted() {
		this.GetMyReportsRequest();
	}
}
</script>

<style scoped>

</style>