<template>
  <div
    class="flex flex-nowrap flex-col justify-between h-full overflow-y-auto gap-6"
  >
    <Header class="shrink-0 grow-0" />
    <div
      class="flex flex-col justify-center items-center w-[600px] mx-auto mobile:text-h4 mobile:w-full text-h3 grow shrink px-4"
    >
      <img class="inline-block w-[310px]" src="/src/assets/fullLogo.svg" />
      <p class="text-gray-c-500 mt-6 text-justify">
        {{ $t('welcomeScreen.helperText') }}
      </p>
      <div
        class="mx-[2.5%] w-full border bg-white rounded-xl border-gray-c-300 border-[2px] h-10 flex flex-nowrap mt-6 mb-9"
        :class="{ 'border-blue-c-500': isInputFocused }"
      >
        <div class="w-[44px] cursor-pointer rounded-xl">
          <img
            alt="search"
            class="h-full w-full object-scale-down"
            src="/search.svg"
          />
        </div>
        <GMapAutocomplete
          id="autocomplete"
          ref="autocomplete"
          v-model="searchRequest"
          class="w-full bg-transparent outline-none block text-h3"
          :options="{
            fields: [`geometry`, `name`],
          }"
          :placeholder="$t('welcomeScreen.searchAddress')"
          :select-first-on-enter="true"
          @focusin="OnInputFocus(true)"
          @focusout="OnInputFocus(false)"
          @place_changed="GetMarker"
        />
        <div
          class="w-[40px] cursor-pointer rounded-xl"
          @click="ClearSearchRequest"
        >
          <img
            id="close-button"
            alt="close"
            class="h-full w-full object-scale-down"
            src="/close.svg"
          />
        </div>
      </div>

      <div v-if="recentReports.length > 0" class="w-full">
        <div class="font-semibold mb-2 bg-white z-10">
          {{ $t('welcomeScreen.recentlyReports') }}
        </div>
        <WelcomeScreenReportList
          class="w-full"
          :delay="5000"
          :reports-list="recentReports"
          @report-click="RecentReportClick"
        />
      </div>

      <!--    <div class="bg-gray-c-200 p-6 mt-12">
        <p class="font-semibold text-black">{{ $t('welcomeScreen.examples') }}: </p>
        <p class="mt-4 font-normal">{{ $t('welcomeScreen.firstExample') }}</p>
        <p class="mt-2 font-normal">{{ $t('welcomeScreen.secondExample') }}</p>
      </div>-->
    </div>
    <footer
      class="mt-[30px] py-6 mobile:py-5 px-4 gap-6 mobile:gap-3 flex items-center flex-wrap justify-center"
    >
      <div
        class="flex gap-6 flex-nowrap text-h4 text-blue-c-500 font-semibold break-words"
      >
        <a href="https://about.projectdim.org" target="_blank">{{
          $t('footer.about')
        }}</a>
        <a href="https://dimblog.wixsite.com/project-dim" target="_blank">{{
          $t('footer.blog')
        }}</a>
        <a href="https://about.projectdim.org/" target="_blank"
          >❤ {{ $t('footer.support') }}</a
        >
      </div>
      <div
        class="flex gap-4 flex-nowrap text-h4 text-gray-c-400 font-semibold mobile:text-b3"
      >
        <p>{{ $t('footer.ngo') }}</p>
        <p>{{ $t('footer.code') }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import api from '../../http_client/index.js'
import SVG_building_condition from '../ComponentsSVG/SVG_building_condition.vue'
import Header from '../Header.vue'
import Test from '../Test.vue'

import WelcomeScreenReportList from './WelcomeScreenReportList.vue'

export default {
  name: 'WelcomeScreen',
  components: {
    WelcomeScreenReportList,
    SVG_building_condition,
    Header,
    Test,
  },
  data: function () {
    return {
      searchRequest: null,
      isInputFocused: false,
      recentReports: [],
    }
  },
  methods: {
    ...mapActions({
      GetMarkerByCoords: 'GetMarkerByCoords',
      getMarkerById: 'getMarkerById',
    }),
    ...mapMutations({
      setSelectedMarker: 'setSelectedMarker',
    }),
    OnInputFocus(arg) {
      this.isInputFocused = arg
    },
    ClearSearchRequest() {
      let autocomplete = document.getElementById('autocomplete')
      autocomplete.value = ''
    },
    GetMarker(arg) {
      let payload = {}
      try {
        payload = this.coordsFormatter(arg.geometry.location)
        console.log(payload)
      } catch {
        this.$toast.error(
          this.$t('welcomeScreen.requestError', {
            address: arg.name ?? '',
          })
        )
        return
      }
      this.GetMarkerByCoords({ position: payload, name: arg.name })
      this.$router.push('/main/overview')
    },
    RecentReportClick(report) {
      this.setSelectedMarker(report)
      this.$router.replace({
        path: '/main/overview',
        query: { id: report.id, ...report.position },
      })
    },
    async GetRecentReports() {
      await api.locations
        .getRecentReports(20)
        .then((res) => {
          this.recentReports = res.data ?? []
        })
        .catch((err) => {
          console.error(err)
        })
    },
    coordsFormatter(coords) {
      let res = {}
      if (typeof coords.lat == 'function') res.lat = coords.lat()
      else if (typeof coords.lat == 'number') res.lat = coords.lat
      else if (typeof coords.lat == 'string') res.lat = Number(coords.lat)

      if (typeof coords.lng == 'function') res.lng = coords.lng()
      else if (typeof coords.lng == 'number') res.lng = coords.lng
      else if (typeof coords.lng == 'string') res.lng = Number(coords.lng)
      return res
    },
  },
  computed: {
    ...mapState(['selectedMarkerData', 'notFoundedMarkerData']),
  },
  /*watch : {
		selectedMarkerData: function (newVal){
			if(newVal !== null)
				this.$router.push("/main/overview");
		},
		notFoundedMarkerData: function (newVal){
			if(newVal !== null)
				this.$router.push("/main/overview");
		}
	},*/
  mounted() {
    //if(this.selectedMarkerData !==null || this.notFoundedMarkerData !==null)
    //	this.$router.replace("/main");
    this.GetRecentReports()
  },
}
</script>
