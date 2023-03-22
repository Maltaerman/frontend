<template>
  <div id="sideBarAidWorker" class="h-full overflow-y-auto shadow-cs1">
    <h1
      class="my-6 px-6 text-h1 font-semibold tablet:px-4 tablet:text-h1-m mobile:px-4 mobile:text-h1-m"
    >
      {{ $t('aidWorkerSideBar.header') }}
    </h1>
    <div
      class="flex flex-nowrap text-center text-h3 tablet:text-h4 mobile:text-h4"
    >
      <TabItemButton
        class="w-full"
        :current-tab-value="selectedTabItem"
        target-tab-value="All requests"
        @click="setSelectedTab(`All requests`)"
      >
        {{ $t('aidWorkerSideBar.allRequests') }} ({{ RequestsCount }})
      </TabItemButton>

      <TabItemButton
        class="w-full"
        :current-tab-value="selectedTabItem"
        target-tab-value="My requests"
        @click="setSelectedTab(`My requests`)"
      >
        {{ $t('aidWorkerSideBar.myRequests') }} ({{ MyUnreviewedMarkerCount }})
      </TabItemButton>
    </div>
    <div>
      <keep-alive>
        <ReportsRequestsList
          v-if="selectedTabItem === `All requests`"
          :is-loader-visible="requestedMarkers.isLoaderVisible"
          :page="requestedMarkers.page"
          :page-max="requestedMarkers.pageMax"
          :unreviewed-markers="requestedMarkers.unreviewedMarkers"
          @add-to-my-list="OnAddToMyList"
          @next-page="GetReportsRequest"
        />
      </keep-alive>
      <MyReportRequestList
        v-if="selectedTabItem === `My requests`"
        :my-unreviewed-markers="myList.myUnreviewedMarkers"
        @remove-from-my-list="OnRemoveFromMyList"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import api from '@/http_client/index.js'
import TabItemButton from '@/components/Other/TabItemButton.vue'

import MyReportRequestList from '@/components/SidebarComponents/AidWorkerSidebar//MyReportRequestList.vue'
import ReportsRequestsList from '@/components/SidebarComponents/AidWorkerSidebar//ReportsRequestsList.vue'

export default {
  name: 'SideBarAidWorker',
  components: {
    TabItemButton,
    MyReportRequestList,
    ReportsRequestsList,
  },
  props: {
    selectedMarker: Object,
  },
  data: function () {
    return {
      selectedTabItem: 'All requests',
      userLocation: {},
      requestedMarkers: {
        unreviewedMarkers: [],
        page: 0,
        pageMax: -1,
        isLoaderVisible: false,
        limit: 20,
      },
      myList: {
        myUnreviewedMarkers: [],
        isLoaderVisible: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'isAuth',
      RequestsCount: 'RequestsCount',
    }),
    MyUnreviewedMarkerCount() {
      return this.myList.myUnreviewedMarkers.length
    },
  },
  mounted() {
    this.GetReportsRequest()
    this.GetMyReportsRequest()
  },
  methods: {
    setSelectedTab(tabName) {
      this.selectedTabItem = tabName
    },
    async GetReportsRequest() {
      if (!this.isAuth) return

      let payload = {
        page: ++this.requestedMarkers.page,
        limit: this.requestedMarkers.limit,
      }
      this.requestedMarkers.isLoaderVisible = true

      await navigator.geolocation.getCurrentPosition(
        async (pos) => {
          this.userLocation.user_lat = pos.coords.latitude
          this.userLocation.user_lng = pos.coords.longitude
          payload = { ...payload, ...this.userLocation }
          await this.GetRequestsPage(payload)
        },
        async () => {
          await this.GetRequestsPage(payload)
        },
        { timeout: 5000 },
      )
    },
    async GetRequestsPage(payload) {
      await api.locations
        .getReportsRequests(payload)
        .then((res) => {
          if (res.data.length === 0)
            this.requestedMarkers.pageMax = --this.requestedMarkers.page
          else if (res.data.length < 20)
            this.requestedMarkers.pageMax = this.requestedMarkers.page
          this.requestedMarkers.unreviewedMarkers = [
            ...this.requestedMarkers.unreviewedMarkers,
            ...res.data,
          ]
        })
        .catch(() => {
          this.$toast.error(this.$t('general.errorMessage'))
        })
        .finally(() => {
          this.requestedMarkers.isLoaderVisible = false
        })
    },

    async GetMyReportsRequest() {
      if (!this.isAuth) return
      this.myList.isLoaderVisible = true
      await api.locations
        .getAssignedRequests()
        .then((res) => {
          this.myList.myUnreviewedMarkers = res.data
        })
        .catch((err) => {
          this.$toast.error(this.$t('general.errorMessage'))
          alert(err)
        })
        .finally(() => {
          this.myList.isLoaderVisible = false
        })
    },

    OnRemoveFromMyList(req) {
      this.myList.myUnreviewedMarkers = this.myList.myUnreviewedMarkers.filter(
        (el) => el.id !== req.id,
      )
      let removedReq = this.requestedMarkers.unreviewedMarkers.find(
        (x) => x.id === req.id,
      )
      if (removedReq) removedReq.reported_by = req.reported_by
    },
    OnAddToMyList(req) {
      let addedReq = this.requestedMarkers.unreviewedMarkers.find(
        (x) => x.id === req.id,
      )
      if (addedReq) {
        addedReq.reported_by = req.reported_by
        this.myList.myUnreviewedMarkers = [
          addedReq,
          ...this.myList.myUnreviewedMarkers,
        ]
      }
    },
  },
}
</script>

<style scoped></style>
