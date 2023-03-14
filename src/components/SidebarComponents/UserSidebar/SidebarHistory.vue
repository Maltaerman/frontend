<template>
  <div class="relative">
    <BaseLoader v-if="isLoader" />
    <HistoryItem
      v-for="logItem in sortedChangedLogs"
      :key="`historyItem${logItem[0].id}`"
      :logs="logItem"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import BaseLoader from '../../BaseLoader.vue'

import HistoryItem from './HistoryItem.vue'

export default {
  name: 'SidebarHistory',
  components: { BaseLoader, HistoryItem },
  data() {
    return {
      sortedChangedLogs: [],
      isLoader: false,
    }
  },
  computed: {
    ...mapState({
      changeLogs: (state) => state.selectedMarkerHistoryData,
      selectedMarkerData: (state) => state.selectedMarkerData,
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
    selectedMarkerData() {
      this.updateSelectedMarkerHistory()
    },
    changeLogs() {
      this.sortChangedLogs()
    },
  },
  mounted() {
    this.updateSelectedMarkerHistory()
    this.sortChangedLogs()
  },
  methods: {
    ...mapActions({
      updateSelectedMarkerHistory: 'getSelectedDataHistory',
    }),
    sortChangedLogs() {
      this.isLoader = true
      let result = this.changeLogs.reduce((dates, log) => {
        let date = log.created_at.split('T')[0]
        if (!dates[date]) dates[date] = []
        dates[date].push(log)
        return dates
      }, {})
      this.sortedChangedLogs = result
      this.isLoader = false
    },
  },
  
}
</script>

<style scoped></style>
