<template>
  <div
    class="relative mb-4 rounded-lg p-4 shadow-cs3"
    :class="{
      'bg-blue-c-100': isSelected,
      'border border-red-c-500': isExpired,
    }"
  >
    <div>
      <div class="mb-3 flex justify-between">
        <div class="text-h4 text-gray-c-500">
          <span
            v-if="!isExpired"
            class="capitalize"
          >
            {{ GetDayDateString(locationRequest.created_at) }}
          </span>
          <span
            v-else
            class="text-red-c-500"
          >
            {{ $t('aidWorkerSideBar.expireIn', { hours: expireInHours }) }}
          </span>
        </div>
        <div class="text-h4 text-gray-c-500">
          {{ locationRequest.city }}
          <img
            class="inline-block"
            src="/Marker-gray.svg"
          >
          {{
            locationRequest.distance
              ? locationRequest.distance.toFixed(0) + ' km'
              : $t('general.unknown')
          }}
        </div>
      </div>
      <div
        class="cursor-pointer pb-2 text-h3 font-semibold text-blue-c-500 shadow-cs2"
        @click="setSelectedRequest(locationRequest)"
      >
        <img
          class="mr-1 inline-block"
          src="/Marker-blue.svg"
        >
        {{ markerAddress }}
      </div>
      <div class="mt-4 flex items-baseline justify-between">
        <div>
          <button-1 @click="Reporting">
            {{ $t('aidWorkerSideBar.takeRequest') }}
          </button-1>
          <button-2
            v-if="isMyRequest && itemUsageTabName === 'myRequestsList'"
            class="ml-3"
            @click="RemoveFromMyRequests"
          >
            {{ $t('general.delete') }}
          </button-2>
        </div>

        <button-text-1
          v-if="!isMyRequest && itemUsageTabName === 'requestsList'"
          @click="AddToMyRequests"
        >
          {{ $t('aidWorkerSideBar.addToMyList') }}
        </button-text-1>

        <div
          v-else-if="isMyRequest && itemUsageTabName === 'requestsList'"
          class="p-2 text-h3 font-medium text-blue-c-500"
        >
          <img
            class="mr-2 inline-block"
            src="/completed2.svg"
          >
          {{ $t('aidWorkerSideBar.myRequest') }}
        </div>
      </div>
    </div>
    <Loader v-if="isLoaderVisible" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import api from '../../../http_client/index'
import Loader from '../../Loader.vue'
import dateFormatter from '../../mixins/dateFormatter'

export default {
  name: 'ReportRequestListItem',
  components: { Loader },
  mixins: [dateFormatter],
  props: {
    locationRequest: {
      type: Object,
      required: true,
    },
    itemUsageTabName: {
      type: String,
      default: 'requestsList',
      validator(value) {
        return ['requestsList', 'myRequestsList'].includes(value)
      },
    },
  },
  emits: ['remove-from-my-list', 'add-to-my-list'],
  data() {
    return {
      isLoaderVisible: false,
      expireInHours: 2,
    }
  },
  computed: {
    ...mapState({
      selectedLocationRequest: (state) => state.reports.selectedLocationRequest,
      AidWorker: (state) => state.user.loggedUserInfo,
    }),
    isSelected() {
      if (!this.selectedLocationRequest || !this.locationRequest) return false
      return this.locationRequest.id === this.selectedLocationRequest.id
    },
    isMyRequest() {
      return this.locationRequest.reported_by === this.AidWorker.id
    },
    markerAddress() {
      let address = ''
      if (this.locationRequest.address) address += `${this.locationRequest.address}, `
      if (this.locationRequest.street_number) address += `${this.locationRequest.street_number}, `
      /* if(this.locationRequest.index)
        address += `${this.locationRequest.index}, ` */
      if (this.locationRequest.city) address += `${this.locationRequest.city}`
      let trim = 0
      // eslint-disable-next-line for-direction, no-plusplus
      for (let i = address.length - 1; i <= 0; i--) {
        // eslint-disable-next-line no-plusplus
        if (address[i] === ' ' || address[i] === ',') trim++
        else break
      }
      address = address.substring(0, address.length - trim)
      return address.length > 0 ? address : this.$t('general.error')
    },
    // is request remove from "My request" in 2 hours
    isExpired() {
      const result = false
      if (
        this.locationRequest.reported_by
        && this.locationRequest.report_expires
      ) {
        return (
          this.GetDate(this.locationRequest.report_expires)
            - this.GetDate(Date.now())
          <= this.expireInHours * 3600000
        )
      }
      return result
    },
  },
  methods: {
    ...mapActions(['setSelectedRequest']),
    Reporting() {
      this.setSelectedRequest(this.locationRequest)
      this.$router.push('/main/submit-report')
    },
    async AddToMyRequests() {
      this.isLoaderVisible = true
      await api.locations
        .assignRequest(this.locationRequest.id)
        .then((res) => {
          this.$emit('add-to-my-list', res.data)
        })
        .catch((err) => {
          window.console.log(err)
        })
        .finally(() => {
          this.isLoaderVisible = false
        })
    },
    async RemoveFromMyRequests() {
      this.isLoaderVisible = true
      await api.locations
        .removeAssignRequest(this.locationRequest.id)
        .then((res) => {
          this.$emit('remove-from-my-list', res.data)
        })
        .catch((err) => {
          window.console.log(err)
        })
        .finally(() => {
          this.isLoaderVisible = false
        })
    },
  },
}
</script>

<style scoped></style>
