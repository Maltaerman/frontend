<template>
  <div class="p-6 relative">
    <div class="text-h4 mb-4 text-gray-c-600">
      {{ $t('aidWorkerSideBar.expireMessage') }}
    </div>
    <ReportRequestListItem
      v-for="item in myUnreviewedMarkers"
      v-if="myUnreviewedMarkers.length > 0"
      :key="`request${item.id}`"
      itemUsageTabName="myRequestsList"
      :location-request="item"
      @remove-from-my-list="OnRemoveFromMyList"
    />
    <div v-else class="mt-6 text-center text-h3 text-gray-c-800">
      {{ $t('aidWorkerSideBar.myListEmpty') }}
    </div>
    <Loader v-show="isLoaderVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import api from '../../../http_client/index.js'
import Loader from '../../Loader.vue'

import ReportRequestListItem from './ReportRequestListItem.vue'


export default {
  name: 'MyReportRequestList',
  components: {
    ReportRequestListItem,
    Loader,
  },
  props: {
    myUnreviewedMarkers: {
      type: Array,
      default: [],
    },
    isLoaderVisible: {
      type: Boolean,
      defaults: false,
    },
  },
  emits: ['remove-from-my-list'],
  methods: {
    OnRemoveFromMyList(request) {
      this.$emit('remove-from-my-list', request)
    },
  },
}
</script>

<style scoped></style>
