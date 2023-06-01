<template>
  <Header/>
  <div
    class="flex h-[calc(100vh-62px)] comp:h-[calc(100vh-74px)] tablet:flex-col mobile:flex-col"
  >
    <div class="z-50 shrink-0 comp:w-[600px] tablet:order-2 mobile:order-2">
      <router-view></router-view>
    </div>
    <div class="min-h-[456px] w-full p-0 tablet:order-1 mobile:order-1">
      <GoogleMap />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from './Header/HeaderV2.vue'
import GoogleMap from './MapComponents/GoogleMap.vue'

export default {
  name: 'MainScreen',
  components: {
    Header,
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
