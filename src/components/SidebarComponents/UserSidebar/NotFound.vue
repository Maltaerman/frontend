<template>
  <div class="flex flex-col justify-between overflow-y-auto h-full shadow-cs1
		text-h3 mobile:text-h4 tablet:text-h3">
    <div class="p-6">
      <div v-if="notFoundedMarkerData">
        <p class="font-semibold text-4xl">
          {{ $t("notFoundAddress.noDBItem", {address : notFoundedMarkerData.address}) }}
        </p>
        <div class="mt-2.5 ">
          <div v-if="notFoundedMarkerData.isRequested" class="flex items-center gap-2">
            <svg width="23" height="22" class="fill-green-c-500" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 11C0.5 4.92487 5.42487 0 11.5 0C17.5751 0 22.5 4.92487 22.5 11C22.5 17.0751 17.5751 22 11.5 22C5.42487 22 0.5 17.0751 0.5 11ZM11.5 2C6.52944 2 2.5 6.02944 2.5 11C2.5 15.9706 6.52944 20 11.5 20C16.4706 20 20.5 15.9706 20.5 11C20.5 6.02944 16.4706 2 11.5 2ZM17.2071 7.29289C17.5976 7.68342 17.5976 8.31658 17.2071 8.70711L10.2071 15.7071C9.81658 16.0976 9.18342 16.0976 8.79289 15.7071L5.79289 12.7071C5.40237 12.3166 5.40237 11.6834 5.79289 11.2929C6.18342 10.9024 6.81658 10.9024 7.20711 11.2929L9.5 13.5858L15.7929 7.29289C16.1834 6.90237 16.8166 6.90237 17.2071 7.29289Z"/>
            </svg>
            <p class="text-h3 text-green-c-500 font-semibold">
              {{ $t("notFoundAddress.requestExist") }}
            </p>
          </div>
          <div v-else class="text-gray-c-500 ">
            {{ $t("notFoundAddress.tips") }}
          </div>
        </div>
      </div>
      <div v-else>
        <p class="font-semibold text-4xl">{{ $t('userSideBar.choose-location') }}</p>
      </div>
      <button-1 class="w-full my-6" @click="buttonAction" :disabled="buttonDisabled">
        <span v-if="notFoundedMarkerData && notFoundedMarkerData.isRequested && isRoleHaveAccess(getRole, userRoles.aidWorker)">
          {{ $t('aidWorkerSideBar.takeRequest') }}
				</span>
				<span v-else-if="notFoundedMarkerData">
          {{ $t('notFoundAddress.sendRequest') }}
				</span>
				<span v-else>
					{{ $t('userSideBar.choose-location-button') }}
				</span>
			</button-1>
<!--			<FeedBackForm/>-->
    </div>
    <Footer/>
		<Loader v-if="isLoader"/>
    <SendReportRequestModal :is-modal-visible="isRequestModalView" :close-func="closeReqModal"/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import axios from "axios";
import api from "../../../api/index.js"
import Loader from "../../Loader.vue";
import FeedBackForm from "./FeedBackForm.vue";
import userRoles from "../../mixins/userRoles.js";
import SendReportRequestModal from "../../Modals/SendReportRequestModal.vue";
import Footer from "./Footer.vue";

export default {
  name: "NotFound",
  mixins : [userRoles],
	components: {
		Footer,
    SendReportRequestModal,
		FeedBackForm,
		Loader
	},
  data(){
    return {
      isLoader : false,
      isRequestModalView : false
    }
  },
	computed : {
    ...mapState({
      notFoundedMarkerData :"notFoundedMarkerData",
    }),
    ...mapGetters({
      getRequestMarkers : "getRequestMarkers",
    }),
    buttonDisabled(){
      if(this.notFoundedMarkerData===null)
        return true;
      else if(this.notFoundedMarkerData.isRequested
          && this.getRole === this.userRoles.user)
        return true;
      else
        return false;
    }
	},
	methods : {
    ...mapActions({
      setUnreviewedMarkers : "setUnreviewedMarkers",
      setNotFoundMarker : "setNotFoundMarker",
      setSelectedRequest : "setSelectedRequest"
    }),
    async reviewNotFoundMarker(){
      if(!this.notFoundedMarkerData.location_id)
        return;
      this.isLoader = true;
      await api.locations.getLocationById(this.notFoundedMarkerData.location_id)
          .then(res=>{
            console.log(res)
            if(res.data.reported_by && res.data.reported_by !== this.getUser.id){
              this.$toast.error(this.$t("notFoundAddress.modalErrReqInWork"), {
                duration : false
              })
              return;
            }
            this.setSelectedRequest(res.data);
            this.isLoader = false;
            this.$router.push("/main/submit-report")
          })
          .catch(err=>{
            this.isLoader = false;
            this.$toast.error(this.$t("general.errorMessage"))
          })
    },
    buttonAction(){
      if(this.notFoundedMarkerData.isRequested
          && this.isRoleHaveAccess(this.getRole, this.userRoles.aidWorker))
       this.reviewNotFoundMarker();
      else
        this.isRequestModalView = true;
    },
    closeReqModal(){
      this.isRequestModalView = false;
    }
	}
}
</script>

<style scoped>

</style>


<!--
async getPlaceData (lat, lng) {
let placeData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat + ',' + lng}&key=${import.meta.env.VITE_GMAPS_APIKEY}`)
.then((res => res.data))
.catch((err) => console.log(JSON.stringify(err)));
if (!placeData) return
let addressData = placeData.results[0].address_components;
let coordsData = placeData.results[0].geometry;
let formattedAddress = {};
for (var i = 0; i < addressData.length; i++) {
var c = addressData[i];
formattedAddress[c.types[0]] = c;
}
return {
address: formattedAddress, coords: coordsData
}
},-->
