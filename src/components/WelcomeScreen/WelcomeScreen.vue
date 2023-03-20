<template>
  <div
    class="overflow-y-auto-custom flex h-full flex-col flex-nowrap justify-between gap-6"
  >
    <Header class="shrink-0 grow-0" />
    <div
      class="mx-auto flex w-[600px] shrink grow flex-col items-center justify-center px-4 text-h3 mobile:w-full mobile:text-h4"
    >
      <img class="inline-block w-[310px]" src="/src/assets/fullLogo.svg" />
      <p class="mt-6 text-justify text-gray-c-500">
        {{ $t('welcomeScreen.helperText') }}
      </p>
      <div
        class="mx-[2.5%] mt-6 mb-9 flex h-10 w-full flex-nowrap rounded-xl border border-[2px] border-gray-c-300 bg-white"
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
          class="block w-full bg-transparent text-h3 outline-none"
          :options="{
            fields: [`geometry`, `name`],
            componentRestrictions: {
              country: [`ua`],
            },
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

      <!--    <div class="bg-gray-c-200 p-6 mt-12">
        <p class="font-semibold text-black">{{ $t('welcomeScreen.examples') }}: </p>
        <p class="mt-4 font-normal">{{ $t('welcomeScreen.firstExample') }}</p>
        <p class="mt-2 font-normal">{{ $t('welcomeScreen.secondExample') }}</p>
      </div>-->
    </div>
    <footer
      class="flex flex-wrap items-center justify-center gap-6 py-6 px-4 mobile:gap-3 mobile:py-5"
    >
      <div
        class="flex flex-nowrap gap-6 break-words text-h4 font-semibold text-blue-c-500"
      >
        <a :href="AboutUrl" target="_blank">{{ $t('footer.about') }}</a>
        <a href="https://dimblog.wixsite.com/project-dim" target="_blank">{{
          $t('footer.blog')
        }}</a>
        <a :href="AboutUrl" target="_blank">❤ {{ $t('footer.support') }}</a>
      </div>
      <div
        class="flex flex-nowrap gap-4 text-h4 font-semibold text-gray-c-400 mobile:text-b3"
      >
        <p>{{ $t('footer.ngo') }}</p>
        <p>{{ $t('footer.code') }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import api from '../../http_client/index.js'
import Header from '../Header.vue'
import coordsHelper from '../mixins/coordsHelper.js'
import Test from '../Test.vue'

import WelcomeScreenReportList from './WelcomeScreenReportList.vue'

export default {
  name: 'WelcomeScreen',
  components: {
    WelcomeScreenReportList,
    Header,
    Test,
  },
  mixins: [coordsHelper],
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
      } catch {
        this.$toast.error(
          this.$t('welcomeScreen.requestError', { address: arg.name ?? '' }),
        )
        return
      }
      this.GetMarkerByCoords({ position: payload, name: arg.name })
    },
    RecentReportClick(report) {
      this.setSelectedMarker(report)
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
  },
  computed: {
    ...mapState(['selectedMarkerData', 'notFoundedMarkerData']),
    AboutUrl() {
      let url
      switch (this.$i18n.locale) {
        case 'ua':
          url = 'https://about.projectdim.org/main.html'
          break
        case 'en':
          url = 'https://about.projectdim.org/main-en.html'
          break
        default:
          url = 'https://about.projectdim.org/main.html'
          break
      }
      return url
    },
  },
  watch: {
    selectedMarkerData: function (newVal) {
      if (newVal !== null)
        this.$router.push({
          path: '/main/overview',
          query: { id: newVal.id, ...newVal.position },
        })
    },
    notFoundedMarkerData: function (newVal) {
      if (newVal !== null) {
        console.log(newVal)
        this.$router.push({
          path: '/main/overview',
          query: { id: newVal.id, ...newVal.position },
        })
      }
    },
  },
  mounted() {
    this.GetRecentReports()
  },
}
</script>
