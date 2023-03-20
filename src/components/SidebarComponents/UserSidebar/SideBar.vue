<template>
  <div
    v-if="selectedMarkerData !== null"
    id="sideBar"
    class="overflow-y-auto-custom h-full shadow-cs1 flex flex-col"
  >
    <h1
      class="px-6 font-semibold my-6 text-h1 mobile:text-h1-m tablet:text-h1-m mobile:px-4 tablet:px-4"
    >
      {{ selectedMarkerAddress }}
    </h1>
    <div
      class="flex flex-nowrap text-center text-h3 mobile:text-h4 tablet:text-h4"
    >
      <TabItemButton
        class="w-full"
        target-tab-value="Overview"
        :current-tab-value="selectedTabItem"
        @click="setSelectedTab('Overview')"
      >
        {{ $t('userSideBar.overview') }}
      </TabItemButton>
      <TabItemButton
        class="w-full"
        target-tab-value="History"
        :current-tab-value="selectedTabItem"
        @click="setSelectedTab(`History`)"
      >
        {{ $t('userSideBar.change-history') }}
      </TabItemButton>
    </div>
    <div class="pt-6 grow">
      <keep-alive>
        <Overview
          v-if="this.selectedTabItem === `Overview` && selectedMarkerData"
        />
      </keep-alive>
      <keep-alive>
        <History v-if="this.selectedTabItem === `History`" />
      </keep-alive>
    </div>
  </div>
  <NotFound v-else />
</template>

<script>
import Overview from './Overview.vue'
import History from './History.vue'
import { mapState } from 'vuex'
import NotFound from './NotFound.vue'
import TabItemButton from '../../Other/TabItemButton.vue'

export default {
  name: 'SideBar',
  props: {
    selectedMarker: Object,
  },
  components: {
    TabItemButton,
    History,
    Overview,
    NotFound,
  },
  methods: {
    setSelectedTab(tabName) {
      this.selectedTabItem = tabName
    },
  },
  data: function () {
    return {
      selectedTabItem: 'Overview',
    }
  },
  computed: {
    ...mapState({
      selectedMarkerData: 'selectedMarkerData',
    }),
    selectedMarkerAddress() {
      let address = ''
      if (this.selectedMarkerData.address)
        address += `${this.selectedMarkerData.address}, `
      if (this.selectedMarkerData.street_number)
        address += `${this.selectedMarkerData.street_number}, `
      if (this.selectedMarkerData.index)
        address += `${this.selectedMarkerData.index}, `
      if (this.selectedMarkerData.city)
        address += `${this.selectedMarkerData.city}`
      let trim = 0
      for (let i = address.length - 1; i <= 0; i--) {
        if (address[i] === ' ' || address[i] === ',') trim++
        else break
      }
      address = address.substring(0, address.length - trim)
      return address.length > 0 ? address : this.$t('general.error')
    },
  },
}
</script>

<style scoped></style>
