<template>
  <div class="relative">
    <Loader v-if="isLoader" />
    <HistoryItem
      v-for="logItem in sortedChangedLogs"
      :key="`historyItem${logItem[0].id}`"
      :logs="logItem"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Loader from '../../Loader.vue'

import HistoryItem from './HistoryItem.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'History',
  components: { Loader, HistoryItem },
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
    /* isLoader(){
      return this.sortedChangedLogs.length <=0
    } */
    /* sortedChangedLogs(){
      let result = this.changeLogs.reduce((dates, log)=>{
        let date = log.created_at.split("T")[0];
        if(!dates[date])
          dates[date] = []
        dates[date].push(log)
        return dates
      }, {});
      return result;
    } */
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
      const result = this.changeLogs.reduce((dates, log) => {
        if (log.hidden) return dates
        const date = log.created_at.split('T')[0]
        // eslint-disable-next-line no-param-reassign
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
