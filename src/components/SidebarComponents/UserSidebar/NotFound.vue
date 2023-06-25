<!-- eslint-disable max-len -->
<template>
  <div
    class="
      flex h-full flex-col justify-between overflow-y-auto
      text-h3 shadow-cs1 tablet:text-h3 mobile:text-h4
    "
  >
    <div class="p-6">
      <div v-if="notFoundedMarkerData">
        <p class="text-4xl font-semibold">
          {{ $t('notFoundAddress.noDBItem', { address: Address }) }}
        </p>
        <div class="mt-2.5">
          <div
            v-if="notFoundedMarkerData.id"
            class="flex items-center gap-2"
          >
            <svg
              class="fill-green-c-500"
              fill="none"
              height="22"
              viewBox="0 0 23 22"
              width="23"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M0.5 11C0.5 4.92487 5.42487 0 11.5 0C17.5751 0 22.5 4.92487 22.5 11C22.5 17.0751 17.5751 22 11.5 22C5.42487 22 0.5 17.0751 0.5 11ZM11.5 2C6.52944 2 2.5 6.02944 2.5 11C2.5 15.9706 6.52944 20 11.5 20C16.4706 20 20.5 15.9706 20.5 11C20.5 6.02944 16.4706 2 11.5 2ZM17.2071 7.29289C17.5976 7.68342 17.5976 8.31658 17.2071 8.70711L10.2071 15.7071C9.81658 16.0976 9.18342 16.0976 8.79289 15.7071L5.79289 12.7071C5.40237 12.3166 5.40237 11.6834 5.79289 11.2929C6.18342 10.9024 6.81658 10.9024 7.20711 11.2929L9.5 13.5858L15.7929 7.29289C16.1834 6.90237 16.8166 6.90237 17.2071 7.29289Z"
                fill-rule="evenodd"
              />
            </svg>
            <p class="text-h3 font-semibold text-green-c-500">
              {{ $t('notFoundAddress.requestExist') }}
            </p>
          </div>
          <div
            v-else
            class="text-gray-c-500"
          >
            {{ $t('notFoundAddress.tips') }}
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-4xl font-semibold">
          {{ $t('userSideBar.choose-location') }}
        </p>
      </div>
      <button-1
        class="my-6 w-full"
        :disabled="buttonDisabled"
        @click="buttonAction"
      >
        {{ buttonLocalization }}
      </button-1>
      <div
        v-if="recentReports.length > 0"
        class="w-full"
      >
        <div class="z-10 mb-2 bg-white font-semibold">
          {{ $t('welcomeScreen.recentlyReports') }}
        </div>
        <WelcomeScreenReportList
          class="w-full"
          :delay="5000"
          :reports-list="recentReports"
          @report-click="RecentReportClick"
        />
      </div>
    </div>
    <Footer />
    <Loader v-if="isLoader" />
    <SendReportRequestModal
      :close-func="closeReqModal"
      :is-modal-visible="isRequestModalView"
    />
  </div>
</template>

<!-- eslint-disable consistent-return -->
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import api from '../../../http_client/index'
import Loader from '../../Loader.vue'
import SendReportRequestModal from '../../Modals/SendReportRequestModal.vue'
import WelcomeScreenReportList from '../../WelcomeScreen/WelcomeScreenReportList.vue'
import dynamicContent from '../../mixins/dynamicContent'
import userRoles from '../../mixins/userRoles'

import Footer from './Footer.vue'

export default {
  name: 'NotFound',
  components: {
    WelcomeScreenReportList,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    SendReportRequestModal,
    Loader,
  },
  mixins: [userRoles, dynamicContent],
  data() {
    return {
      isLoader: false,
      isRequestModalView: false,
      recentReports: [],
    }
  },
  computed: {
    ...mapGetters({
      getRequestMarkers: 'getRequestMarkers',
      notFoundedMarkerData: 'notFoundedMarker',
    }),
    buttonDisabled() {
      if (this.notFoundedMarkerData === null) return true
      if (
        this.notFoundedMarkerData.id
        && this.getRole === this.userRoles.user
      ) return true
      return false
    },
    buttonLocalization() {
      let localizeStr = this.$t('userSideBar.choose-location-button')
      if (this.isRoleHaveAccess(this.getRole, this.userRoles.aidWorker)) localizeStr = this.$t('aidWorkerSideBar.takeRequest')
      else if (this.notFoundedMarkerData) localizeStr = this.$t('notFoundAddress.sendRequest')
      return localizeStr
    },
    Address() {
      if (!this.notFoundedMarkerData) return
      return this.notFoundedMarkerData.id
        ? this.ReportAddressFull(this.notFoundedMarkerData)
        : this.notFoundedMarkerData.address
    },
  },
  created() {
    this.GetRecentReports()
  },
  methods: {
    ...mapActions({
      setUnreviewedMarkers: 'setUnreviewedMarkers',
      setNotFoundMarker: 'setNotFoundMarker',
      setSelectedRequest: 'setSelectedRequest',
    }),
    ...mapMutations({
      setSelectedMarker: 'setSelectedMarker',
    }),
    // its for existed requests
    async reviewNotFoundMarker() {
      if (!this.notFoundedMarkerData.id) return
      this.isLoader = true
      await api.locations
        .getLocationById(this.notFoundedMarkerData.id)
        .then((res) => {
          this.GetExistedRequestInWork(res.data)
        })
        .catch(() => {
          this.isLoader = false
          this.$toast.error(this.$t('general.errorMessage'))
        })
    },
    GetExistedRequestInWork(request) {
      if (request.reported_by && request.reported_by !== this.getUser.id) {
        this.$toast.error(this.$t('notFoundAddress.modalErrReqInWork'), {
          duration: false,
        })
        return
      }
      this.setSelectedRequest(request)
      this.isLoader = false
      this.$router.push('/main/submit-report')
    },
    //
    // Resent reports
    async GetRecentReports() {
      await api.locations
        .getRecentReports(20)
        .then((res) => {
          this.recentReports = res.data ?? []
        })
        .catch((err) => {
          window.console.error(err)
        })
    },
    RecentReportClick(report) {
      this.setSelectedMarker(report)
      this.$router.replace({
        path: '/main/overview',
        query: { id: report.id, ...report.position },
      })
    },
    //

    // Reporting unrequested location
    async reviewNotExistedMarker() {
      if (!this.isRoleHaveAccess(this.getRole, this.userRoles.aidWorker)) return
      this.isLoader = true
      const position = { ...this.notFoundedMarkerData.position }
      await api.locations
        .getGeocodingOSM(this.notFoundedMarkerData.position)
        .then((res) => {
          if (res.data) {
            this.createNotRequestedReport({ ...position, ...res.data })
          } else throw new Error()
        })
        .catch(() => {
          this.$toast.error(this.$t('general.errorMessage'))
        })
        .finally(() => {
          this.isLoader = false
        })
    },
    createNotRequestedReport(reportData) {
      this.setSelectedRequest(reportData)
      this.$router.push('/main/submit-report')
    },
    //

    buttonAction() {
      if (
        this.notFoundedMarkerData.id
        && this.isRoleHaveAccess(this.getRole, this.userRoles.aidWorker)
      ) this.reviewNotFoundMarker()
      else if (
        !this.notFoundedMarkerData.id
        && this.isRoleHaveAccess(this.getRole, this.userRoles.aidWorker)
      ) this.reviewNotExistedMarker()
      else this.isRequestModalView = true
    },
    closeReqModal() {
      this.isRequestModalView = false
    },
  },
}
</script>

<style scoped></style>
