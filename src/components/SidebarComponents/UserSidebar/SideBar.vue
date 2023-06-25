<template>
  <div
    v-if="selectedMarkerData !== null"
    id="sideBar"
    class="overflow-y-auto-custom flex h-full flex-col shadow-cs1"
  >
    <h1
      class="
        my-6 px-6 text-h1 font-semibold tablet:px-4 tablet:text-h1-m mobile:px-4 mobile:text-h1-m
      "
    >
      {{ selectedMarkerAddress }}
    </h1>
    <div
      class="flex flex-nowrap text-center text-h3 tablet:text-h4 mobile:text-h4"
    >
      <TabItemButton
        class="w-full"
        :current-tab-value="selectedTabItem"
        target-tab-value="Overview"
        @click="setSelectedTab('Overview')"
      >
        {{ $t('userSideBar.overview') }}
      </TabItemButton>
      <TabItemButton
        class="w-full"
        :current-tab-value="selectedTabItem"
        target-tab-value="History"
        @click="setSelectedTab(`History`)"
      >
        {{ $t('userSideBar.change-history') }}
      </TabItemButton>
    </div>
    <div class="grow pt-6">
      <keep-alive>
        <Overview v-if="selectedTabItem === `Overview` && selectedMarkerData" />
      </keep-alive>
      <keep-alive>
        <History v-if="selectedTabItem === `History`" />
      </keep-alive>
    </div>
  </div>
  <NotFound v-else />
</template>

<script>
import { mapState } from 'vuex'

import TabItemButton from '../../Other/TabItemButton.vue'

import History from './History.vue'
import NotFound from './NotFound.vue'
import Overview from './Overview.vue'

export default {
  name: 'SideBar',
  components: {
    TabItemButton,
    History,
    Overview,
    NotFound,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    selectedMarker: Object,
  },
  data() {
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
      if (this.selectedMarkerData.address) address += `${this.selectedMarkerData.address}, `
      if (this.selectedMarkerData.street_number) address += `${this.selectedMarkerData.street_number}, `
      if (this.selectedMarkerData.index) address += `${this.selectedMarkerData.index}, `
      if (this.selectedMarkerData.city) address += `${this.selectedMarkerData.city}`
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
  },
  methods: {
    setSelectedTab(tabName) {
      this.selectedTabItem = tabName
    },
  },
}
</script>

<style scoped></style>
