<template>
  <div class="relative p-6">
    <div class="mb-4 text-h4 text-gray-c-600">
      {{ $t('aidWorkerSideBar.expireMessage') }}
    </div>
    <div v-if="myUnreviewedMarkers.length > 0">
      <ReportRequestListItem
        v-for="item in myUnreviewedMarkers"
        :key="`request${item.id}`"
        item-usage-tab-name="myRequestsList"
        :location-request="item"
        @remove-from-my-list="OnRemoveFromMyList"
      />
    </div>

    <div
      v-else
      class="mt-6 text-center text-h3 text-gray-c-800"
    >
      {{ $t('aidWorkerSideBar.myListEmpty') }}
    </div>
    <Loader v-show="isLoaderVisible" />
  </div>
</template>

<script>
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
      // eslint-disable-next-line vue/require-valid-default-prop
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
