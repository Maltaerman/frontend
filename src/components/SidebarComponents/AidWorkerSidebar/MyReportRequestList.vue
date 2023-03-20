<template>
  <div class="relative p-6">
    <div class="mb-4 text-h4 text-gray-c-600">
      {{ $t('aidWorkerSideBar.expireMessage') }}
    </div>
    <ReportRequestListItem
      v-if="myUnreviewedMarkers.length > 0"
      v-for="item in myUnreviewedMarkers"
      :key="`request${item.id}`"
      :location-request="item"
      itemUsageTabName="myRequestsList"
      @remove-from-my-list="OnRemoveFromMyList"
    />
    <div v-else class="mt-6 text-center text-h3 text-gray-c-800">
      {{ $t('aidWorkerSideBar.myListEmpty') }}
    </div>
    <Loader v-show="isLoaderVisible" />
  </div>
</template>

<script>
import ReportRequestListItem from './ReportRequestListItem.vue'
import Loader from '../../Loader.vue'
import api from '../../../http_client/index.js'
import { mapGetters } from 'vuex'

export default {
  name: 'MyReportRequestList',
  emits: ['remove-from-my-list'],
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
  methods: {
    OnRemoveFromMyList(request) {
      this.$emit('remove-from-my-list', request)
    },
  },
}
</script>

<style scoped></style>
