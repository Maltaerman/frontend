<template>
	<ConfirmModal :is-bg-click-close=false :is-visible="isLeaveModalVisible"
		:cancel-button-text="$t('reportTools.cancelButtonText')"
    :accept-button-text="$t('reportTools.acceptButtonText')"
		:title="$t('general.dataNotSaved')" :question="$t('reportTools.beforeLeaveMessage')"
		:close-func="closeLeavePageConfirmModal"
		:accept-button-func="PageLeaveAccepted"
		:cancel-button-func="PageLeaveCanceled"/>
 <div class="py-4 px-6 overflow-y-auto h-full">
	 <div class="flex flex-wrap justify-between mb-2">
		 <div class="font-semibold text-h2">
			 <span class="align-middle">{{ $t('reportTools.header') }}</span>
		 </div>
		 <div class="flex gap-2 h-[42px] mobile:w-full">
				<button-3 class="min-w-[80px] mobile:grow" @click="GoBack">
					{{ $t('general.cancel') }}
				</button-3>
			 <button-1 @click="PreviewFinishedReport" class="min-w-[80px] mobile:grow" :disabled="saveButtDisabled">
				 {{ $t('general.save') }}
			 </button-1>
		 </div>
	 </div>

   <div class="bg-blue-c-200 p-2 rounded-lg">
		 <h1 class="w-full text-center text-h2 font-semibold">{{$t("reportTools.currentAddress")}}</h1>
     <label>
       <div class="text-h3 text-gray-c-600 py-2">
         {{$t("reportTools.city")}}<sup class="text-red-c-500">*</sup>
       </div>
       <input1 v-model="updatedReport.city" :placeholder="$t('reportTools.city')" class="w-full rounded-xl"
							 :validation-func="AddressValidation" validation-message="Мінімальна довжина 2 символи"/>
     </label>
     <label>
       <div class="text-h3 text-gray-c-600 py-2">
         {{$t("reportTools.street")}}<sup class="text-red-c-500">*</sup>
       </div>
       <input1 v-model="updatedReport.address" :placeholder="$t('reportTools.street')" class="w-full rounded-xl"
							 :validation-func="AddressValidation" validation-message="Мінімальна довжина 2 символи"/>
     </label>
     <label>
       <div class="text-h3 text-gray-c-600 py-2">
         {{ $t("reportTools.streetNumber") }}
       </div>
       <input1 v-model="updatedReport.street_number" :placeholder="$t('reportTools.streetNumber')" class="w-full rounded-xl"/>
     </label>
   </div>

   <div v-for="label in ReportsData()" :key="label.name" class="shadow-cs2 py-4">
     <div class="flex flex-wrap justify-between mb-3 min-h-[34px]">
       <div class="text-h3 text-gray-c-600 py-2">
         {{ $t(`reportTools.${label.name}`) }}
       </div>
       <div class="flex flex-wrap gap-2">
         <ReportRadio :label="label" v-model="updatedReport.reports[label.name].flag"
         :checked-op="updatedReport.reports[label.name].flag"/>
       </div>
     </div>
     <resize-textarea
         class="textArea"
         :placeholder="$t('reportTools.textAreaPlaceholder')"
         v-model="updatedReport.reports[label.name].description"/>
   </div>


 </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Button3 from "../../Buttons/Button_3.vue";
import Button1 from "../../Buttons/Button_1.vue";
import ButtonTag from "../../Buttons/ButtonTag.vue";
import ModalTemplate from "../../Modals/ModalTemplate.vue";
import ConfirmModal from "../../Modals/ConfirmModal.vue";
import helper from "../../mixins/helper.js";
import ReportRadio from "../../Buttons/ReportRadio.vue";
import reportItemFlags from "../../mixins/reportItemFlags.js";
import Input1 from "../../Inputs/Input-1.vue";

export default {
	name: "ReportTools",
	components: {
    Input1,
		ReportRadio,
		ConfirmModal,
		ModalTemplate,
		ButtonTag,
		Button1,
		Button3},
	mixins : [
    helper,
    reportItemFlags
  ],
	data(){
		return {
      updatedReport : {},
      defaultReport: {
        buildingCondition: {
          flag: 'no_data',
          description: ""
        },
        electricity: {
          flag: 'no_data',
          description: ""
        },
        carEntrance: {
          flag: 'no_data',
          description: ""
        },
        water: {
          flag: 'no_data',
          description: ""
        },
        fuelStation: {
          flag: 'no_data',
          description: "",
          distance: 0
        },
        hospital: {
          flag: 'no_data',
          description: "",
          distance: 0
        }
      },
			isLeaveModalVisible : false,
			isPageLeaveConfirmed : false,
			targetLeaveRef : "",
		}
	},
	methods : {
		...mapMutations(['setSelectedMarker']),
		...mapActions(['setSelectedRequest']),
		PreviewFinishedReport(){
			this.setSelectedRequest(this.updatedReport);
			this.isPageLeaveConfirmed = true;
			this.$router.push("submit-report-preview");
		},
		closeLeavePageConfirmModal(){
			this.isLeaveModalVisible = false;
		},
		PageLeaveAccepted(){
			this.isPageLeaveConfirmed = true;
			this.$router.push(this.targetLeaveRef);
		},
		PageLeaveCanceled(){
			this.isPageLeaveConfirmed = false;
			this.targetLeaveRef = ""
		},
		GoBack(){
			this.$router.go(-1);
		},
		AddressValidation(value){
			return value.length >=2;
		},
	},
	computed : {
		...mapGetters(["getSelectedLocationRequest"]),
		saveButtDisabled(){
			if(this.$route.params.previewUpdating){
				return false;
			}
			else {
				return this.updatedReport.city?.length < 2
					|| this.updatedReport.address?.length < 2
					|| !this.updatedReport.reports
					|| this.isEqual2(this.getSelectedLocationRequest, this.updatedReport)
			}
		},
	},
	beforeRouteLeave(to, from, next){
		if(this.isEqual2(this.getSelectedLocationRequest, this.updatedReport))
			next();
		if(this.isPageLeaveConfirmed)
			next();
		else {
			this.isLeaveModalVisible = true;
			this.targetLeaveRef = to.fullPath;
			next(false);
		}
	},
	created() {
		if(this.getSelectedLocationRequest)
			this.updatedReport = JSON.parse(JSON.stringify(this.getSelectedLocationRequest))
    if(!this.getSelectedLocationRequest.reports)
      this.updatedReport.reports = {...this.defaultReport};
	}
}
</script>

<style scoped>

</style>
