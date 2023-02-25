<template>
	<div class="p-6 comp:p-9 overflow-y-auto-custom h-full">
		<div class="title">{{$t("OrganizationChangeLog.title")}}</div>

		<div data-search-inputs-group class="my-6 flex flex-col gap-2.5 comp:flex-row comp:gap-3">
			<input-search class="w-full comp:max-w-[400px] shrink grow" :placeholder="$t('OrganizationChangeLog.searchPlaceholder')"/>
			<drop-down-select class="w-full comp:max-w-[320px] shrink grow"
												v-model="selectedAidWorker"
												:options="aidWorkerDropSuggestion"/>
		</div>
		<organization-change-log-list :logs="logs" @record-visibility-toggle="toggleRecordVisibility"/>
	</div>
</template>

<script>
import InputSearch from "../../Inputs/InputSearch.vue";
import DropDownSelect from "../../Inputs/DropDownSelect.vue";
import {mapActions, mapGetters} from "vuex";
import OrganizationChangeLogList from "./OrganizationChangeLogList.vue";
import StoreEvents from "../../../store/storeEventSystem.js";
export default {
	name: "OrganizationChangeHistory",
	components: {
		OrganizationChangeLogList,
		DropDownSelect,
		InputSearch
	},
	data () {
		return {
			selectedAidWorker : undefined,
			aidWorkerDropSuggestion : [],
			logs : []
		}
	},
	methods : {
		...mapActions({
			GetOrganizationChangeLog : "GetOrganizationChangeLog"
		}),
		updateWorkerSuggestion(){
			this.aidWorkerDropSuggestion =[];
			let unselectedWorker = {
				text : this.$t("OrganizationChangeLog.worker"),
				item : {
					id : undefined
				}
			}
			this.selectedAidWorker = unselectedWorker;
			this.aidWorkerDropSuggestion.push(unselectedWorker);
			if(!this.userOrg)
				return;
			this.userOrg.participants.forEach( el=>{
				this.aidWorkerDropSuggestion.push({
					text : el["username"],
					item : {
						...el
					}
				})
			});
		},
		getOrganizationChangeLog(){
			let payload = {
				organization_id : this.getUser.organization_model.id,
				date_max : Math.round(Date.now() /1000)
			}
			this.GetOrganizationChangeLog(payload);
		},
		onChangeLogsUpdate(data){
			if(data instanceof Error){
				this.$toast(this.$t("general.errorMessage"))
				return;
			}
			else {
				this.logs = data;
			}
		},
		//TODO record visibility toggle
		toggleRecordVisibility(id){
			console.log("toggle "+ id);
		}
	},
	computed : {
		...mapGetters({
			userOrg : "getUserOrganization",
			getUser : "getUser"
		})
	},
	watch : {
		userOrg(newVal){
			this.updateWorkerSuggestion();
		}
	},
	beforeMount() {
		StoreEvents.subscribe(StoreEvents.events.onOrganizationChangeLogUpdate, this.onChangeLogsUpdate)
		this.updateWorkerSuggestion();
		this.getOrganizationChangeLog();
	},
	beforeUnmount() {
		StoreEvents.unsubscribe(StoreEvents.events.onOrganizationChangeLogUpdate, this.onChangeLogsUpdate)
	}
}
</script>

<style scoped>

</style>