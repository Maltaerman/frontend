<template>
  <div class="relative">
    <Loader v-if="isLoader"/>
		<HistoryItem v-for="logItem in sortedChangedLogs" :logs="logItem" :key="`historyItem${logItem[0].id}`"/>
  </div>
</template>

<script>
import HistoryItem from "./HistoryItem.vue";
import {mapActions, mapState} from "vuex";
import Loader from "../../Loader.vue";

export default {
  name: "History",
	components: {Loader, HistoryItem},
  data(){
    return {
      sortedChangedLogs : [],
      isLoader : false
    }
  },
  methods: {
		...mapActions({
			updateSelectedMarkerHistory : "getSelectedDataHistory"
		}),
    sortChangedLogs(){
      this.isLoader = true;
      let result = this.changeLogs.reduce((dates, log)=>{
        let date = log.created_at.split("T")[0];
        if(!dates[date])
          dates[date] = []
        dates[date].push(log)
        return dates
      }, {});
      this.sortedChangedLogs = result;
      this.isLoader = false;
    }
  },
	computed : {
		...mapState({
			changeLogs: state => state.selectedMarkerHistoryData,
			selectedMarkerData: state => state.selectedMarkerData
		}),
    /*isLoader(){
      return this.sortedChangedLogs.length <=0
    }*/
		/*sortedChangedLogs(){
			let result = this.changeLogs.reduce((dates, log)=>{
				let date = log.created_at.split("T")[0];
				if(!dates[date])
					dates[date] = []
				dates[date].push(log)
				return dates
			}, {});
			return result;
		}*/
	},
  watch: {
    selectedMarkerData(){
      this.updateSelectedMarkerHistory();
    },
    changeLogs(){
      this.sortChangedLogs();
    }
  },
  mounted() {
    this.updateSelectedMarkerHistory();
    this.sortChangedLogs();
  },
}
</script>

<style scoped>
</style>
