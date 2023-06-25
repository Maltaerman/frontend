<template>
  <div class="flex h-full flex-col justify-between">
    <div
      id="Overview"
      class="px-6 pb-6 mobile:px-4 mobile:pb-2"
    >
      <h3 class="text-h2 font-semibold mobile:text-h2-m">
        {{ $t('userSideBar.general-status') }}
      </h3>
      <!-- #region  Build status v2-->
      <div class="text-h3 mobile:text-h4">
        <ReportStateItem
          v-for="(flag, index) of Object.keys(reportFlags)"
          :key="index"
          :description="selectedMarker.reports[flag].description"
          :flag="flag"
          :flag-value="selectedMarker.reports[flag].flag"
          :organization-name="selectedMarker.organization_name"
          :update="selectedMarker.updated_at"
        />
      </div>
      <!--      #endregion-->

      <button-1
        v-if="isAuth"
        class="mt-4 w-full"
        @click="UpdateSelectedMarkerReports"
      >
        {{ $t('userSideBar.reportButton') }}
      </button-1>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import reportItemFlags from '../../mixins/reportItemFlags'

import Footer from './Footer.vue'
import ReportStateItem from './ReportStateItem.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Overview',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    ReportStateItem,
  },
  mixins: [reportItemFlags],
  data() {
    return {
      issueMessage: '',
      isModalView: false,
    }
  },
  computed: {
    ...mapState({
      markerReports: (state) => state.selectedMarkerData.reports,
      selectedMarker: (state) => state.selectedMarkerData,
    }),
    ...mapGetters(['isAuth']),
    isDisabled() {
      return this.issueMessage.length < 10
    },
  },
  methods: {
    ...mapActions(['setSelectedRequest']),
    UpdateSelectedMarkerReports() {
      this.setSelectedRequest(this.selectedMarker)
      this.$router.push('/main/submit-report')
    },
  },
}
</script>

<style scoped></style>
