<template>
  <AppHeader />
  <div
    class="flex h-[calc(100vh-62px)] comp:h-[calc(100vh-74px)] mobile:flex-col tablet:flex-col mobile:overflow-y-auto tablet:overflow-y-auto"
  >
    <div class="shrink-0 comp:w-[600px] z-50 mobile:order-2 tablet:order-2">
      <router-view></router-view>
    </div>
    <div class="w-full p-0 min-h-[456px] mobile:order-1 tablet:order-1">
      <GoogleMap />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppHeader from './AppHeader.vue'
import GoogleMap from './MapComponents/GoogleMap.vue'

export default {
  name: 'MainScreen',
  components: {
    AppHeader,
    GoogleMap,
  },
  computed: {
    ...mapGetters({
      selectedReport: 'selectedReport',
      notFoundedMarker: 'notFoundedMarker',
    }),
  },
  watch: {
    notFoundedMarker(newVal) {
      if (newVal) {
        this.$router.replace({
          path: '/main/overview',
          query: { id: newVal.id, ...newVal.position },
        })
      }
    },
    selectedReport(newVal) {
      if (newVal) {
        this.$router.replace({
          path: '/main/overview',
          query: { id: newVal.id, ...newVal.position },
        })
      }
    },
  },
}
</script>

<style scoped></style>
