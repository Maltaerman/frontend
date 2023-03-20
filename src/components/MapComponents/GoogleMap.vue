<template>
  <div id="mapContainer" class="h-full relative">
    <div class="absolute w-full mobile:top-3.5 top-6 z-10">
      <div
        class="border bg-white rounded-xl border-2 h-10 flex flex-nowrap mobile:mx-4 mx-[30px]"
        :class="{
          'border-blue-c-500': isInputFocused,
          'border-gray-c-300': !isInputFocused,
        }"
      >
        <div class="w-[44px] cursor-pointer rounded-xl">
          <img src="/search.svg" class="h-full w-full object-scale-down" />
        </div>
        <GMapAutocomplete
          id="autocomplete"
          ref="autocomplete"
          :placeholder="$t('welcomeScreen.searchAddress')"
          @place_changed="setPlace"
          class="w-full bg-transparent outline-none block text-h3"
          :select-first-on-enter="true"
          :options="{
            fields: [`geometry`, `name`],
          }"
          @focusin="OnInputFocus(true)"
          @focusout="OnInputFocus(false)"
          :v-model="this.searchRequest"
        />
        <div
          class="w-[40px] cursor-pointer rounded-xl"
          @click="this.ClearSearchRequest"
        >
          <img src="/close.svg" class="h-full w-full object-scale-down" />
        </div>
      </div>
    </div>
    <!--		:click="true"
		@click="ClickHandler"-->
    <GMapMap
      ref="map"
      :center="currentMapCenter"
      :zoom="currentMapZoom"
      map-type-id="roadmap"
      style="width: 100%; height: 100%"
      @zoom_changed="OnMapZoomChanged"
      @center_changed="OnMapCenterChanged"
      :click="true"
      @click="ClickHandler"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
        minZoom: 4,
        styles: [
          {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            stylers: [{ visibility: 'off' }],
          },
        ],
      }"
    >
      <GMapMarker
        :v-if="this.isClickMarker"
        key="customMarker"
        :draggable="false"
        :position="this.ClickMarkerCoords"
        :icon="{
          url: '/map-marker.svg',
          scaledSize: { width: 40, height: 40 },
        }"
        :clickable="false"
      />
      <GMapCluster
        :styles="[
          {
            textColor: 'black',
            textSize: 16,
            textLineHeight: 40,
            textColor: 'white',
            url: '/clusters/m3.png',
            height: 44,
            width: 40,
            boxShadow: '2px 2px 10px 0px rgba(115, 118, 128, 0.11)',
          },
        ]"
        :minimumClusterSize="2"
        :zoomOnClick="true"
        :maxZoom="13"
      >
        <!--      Зелені маркера -->
        <GMapMarker
          v-for="(m, index) in this.reviewedMarkers"
          :key="index"
          :position="m.position"
          icon="/map-pin.svg"
          :clickable="true"
          :draggable="false"
          @click="getMarkerInfo(m)"
        />
        <!--      Сині маркера -->
        <GMapMarker
          v-if="getRole !== userRoles.user"
          v-for="(m, index) in this.requestedMarkers"
          :key="index"
          :position="m.position"
          icon="/question-map-pin.svg"
          :clickable="isRoleHaveAccess(getRole, userRoles.aidWorker)"
          :draggable="false"
          @click="getRequestedMarkerInfo(m)"
        />
      </GMapCluster>
    </GMapMap>
    <img
      v-if="isLoaderVisible"
      src="/src/assets/Loader.svg"
      class="block absolute bottom-6 right-6 w-8 h-8 animate-spin"
      alt="Loader..."
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import userRoles from '../mixins/userRoles.js'
import routerHelper from '../mixins/routerHelper.js'
import coordsHelper from '../mixins/coordsHelper.js'

export default {
  name: 'GoogleMap',
  mixins: [userRoles, routerHelper, coordsHelper],
  data: function () {
    return {
      currentMapZoom: 17,
      currentMapCenter: { lat: 49.23414701332752, lng: 28.46228865225255 },
      isClickMarker: false,
      ClickMarkerCoords: null,
      isInputFocused: false,
      searchRequest: '',
      intervalId: '',
      isLoaderVisible: false,
    }
  },
  computed: {
    ...mapGetters({
      getMapCenter: 'getMapCenter',
      getRole: 'getRole',
      reviewedMarkers: 'getReviewedMarkers',
      requestedMarkers: 'getRequestMarkers',
      isAuth: 'isAuth',
      selectedMarker: 'selectedReport',
      notFoundMarker: 'notFoundedMarker',
    }),
  },
  methods: {
    ...mapMutations(['setNoDataMarker', 'setSelectedMarker', 'setMapCenter']),
    ...mapActions([
      'getMarkersByMapCenter',
      'GetMarkerByCoords',
      'getMarkerById',
    ]),
    ClickHandler(event) {
      this.isClickMarker = true
      this.ClickMarkerCoords = this.coordsFormatter(event.latLng)
      this.$router.push('/main/overview')
      this.getGooglePlaceInfo(event.latLng)
    },
    //FIXME coords
    OnMapCenterChanged(coords) {
      this.isLoaderVisible = true
      clearTimeout(this.intervalId)
      this.intervalId = setTimeout(
        () => this.GetMarkersByMapCenter(coords),
        500,
      )
    },
    async GetMarkersByMapCenter(coords) {
      let payload = {
        ...this.coordsFormatter(coords),
        zoom: this.currentMapZoom,
      }
      await this.getMarkersByMapCenter(payload)
      this.isLoaderVisible = false
    },
    /////////
    getMarkerInfo(marker) {
      this.isClickMarker = false
      this.getMarkerById({
        locationId: marker.location_id,
        callbackFailed: () =>
          this.$toast.error(this.$t('general.errorMessage')),
      })
      setTimeout(() => {
        this.currentMapZoom =
          this.currentMapZoom >= 17 ? this.currentMapZoom : 17
      }, 500)
    },
    getRequestedMarkerInfo(marker) {
      this.isClickMarker = false
      this.ClickMarkerCoords = null
      this.getGooglePlaceInfo(marker.position)
      setTimeout(() => {
        this.currentMapZoom =
          this.currentMapZoom >= 17 ? this.currentMapZoom : 17
      }, 500)
    },
    async getGooglePlaceInfo(coords) {
      coords = this.coordsFormatter(coords)
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            coords.lat
          },${coords.lng}&key=${import.meta.env.VITE_GMAPS_APIKEY}`,
        )
        .then((res) => {
          let googlePlace = res.data.results.find((x) =>
            Object.keys(x.geometry).includes('bounds'),
          )
          if (
            googlePlace &&
            this.checkIsCoordsInObjViewport(coords, googlePlace)
          ) {
            let ExistedMarker = this.CheckIsReportedMarkerExist2(googlePlace)
            if (ExistedMarker) {
              this.getMarkerInfo(ExistedMarker)
              this.isClickMarker = false
              this.ClickMarkerCoords = null
            } else {
              let isPlaceRequested = this.GetRequestMarkerIsExist(googlePlace)
              let notFoundedMarker = {
                position: this.coordsFormatter(googlePlace.geometry.location),
                address: googlePlace.formatted_address,
                id: isPlaceRequested ? isPlaceRequested.location_id : undefined,
              }
              this.setNoDataMarker(notFoundedMarker)
            }
          } else {
            let notFoundedMarker = {
              position: coords,
              address: res.data.results[0].formatted_address,
            }
            this.setNoDataMarker(notFoundedMarker)
          }
        })
        .catch((err) => console.log(err))
    },
    CheckIsReportedMarkerExist(googlePlacesArray) {
      let marker = undefined
      for (let i = 0; i < googlePlacesArray.length; i++) {
        marker = this.reviewedMarkers.find((x) => {
          let xx = this.coordsFormatter(x.position)
          let yy = this.coordsFormatter(googlePlacesArray[i].geometry.location)
          return xx.lat == yy.lat && xx.lng == yy.lng
        })
        if (marker) {
          break
        }
      }
      return marker ?? false
    },
    CheckIsReportedMarkerExist2(googlePlace) {
      let marker = this.reviewedMarkers.find((x) => {
        return this.checkIsCoordsInObjViewport(x.position, googlePlace)
      })
      return marker ?? false
    },
    GetRequestMarkerIsExist(googlePlace) {
      let marker = this.requestedMarkers.find((x) => {
        return this.checkIsCoordsInObjViewport(x.position, googlePlace)
      })
      return marker ?? false
    },
    OnMapZoomChanged(arg) {
      this.currentMapZoom = arg
    },
    OnInputFocus(arg) {
      this.isInputFocused = arg
    },
    setPlace(arg) {
      console.log(arg)
      let position = this.coordsFormatter(arg.geometry.location)
      this.GetMarkerByCoords({ name: arg.name, position })
      this.$router.push('/main/overview')
    },
    ClearSearchRequest() {
      let autocomplete = document.getElementById('autocomplete')
      autocomplete.value = ''
    },
    checkIsCoordsInObjViewport(coords, obj) {
      if (!coords || !obj) return false
      let viewport = obj.geometry.bounds
      if (!viewport) {
        console.error('Object bounds is null')
        return false
      }
      let isLatInRange =
        coords.lat >= viewport.southwest.lat &&
        coords.lat <= viewport.northeast.lat
      let isLngInRange =
        coords.lng >= viewport.southwest.lng &&
        coords.lng <= viewport.northeast.lng

      /*console.log(`isLatInRange = ${isLatInRange}; isLngInRange = ${isLngInRange}`)*/
      return isLatInRange && isLngInRange
    },
  },
  watch: {
    getMapCenter: function (newValue) {
      //FIXME костилі для того, щоб центр мапи змінювався
      // при повторному присвоєнні ідентичного значення
      if (newValue && newValue.lng && newValue.lat) {
        this.currentMapCenter = {
          lat: newValue.lat + 0.000005,
          lng: newValue.lng + 0.000005,
        }
        setTimeout(() => {
          this.currentMapCenter = this.coordsFormatter(newValue)
          this.currentMapZoom =
            this.currentMapZoom >= 17 ? this.currentMapZoom : 17
          if (
            this.requestedMarkers.length <= 0 ||
            this.reviewedMarkers.length <= 0
          ) {
            this.getMarkersByMapCenter(this.currentMapCenter)
          }
        }, 500)
      }
    },
  },
  created() {
    let center = this.coordsFormatter({
      lng: this.$route.query.lng,
      lat: this.$route.query.lat,
    })
    if (center.lat && center.lng) this.currentMapCenter = center
    else this.currentMapCenter = this.getMapCenter
    this.OnMapCenterChanged(this.currentMapCenter)

    //region Check if we have selected marker in store
    let isId = this.$route.query.id && Number(this.$route.query.id)
    let isSelectedMarkerId =
      this.selectedMarker &&
      isId &&
      this.selectedMarker.id == this.$route.query.id
    let isNotFoundMarkerId =
      this.notFoundMarker &&
      isId &&
      this.notFoundMarker.id == this.$route.query.id
    //endregion

    if (!isNotFoundMarkerId && !isSelectedMarkerId && isId) {
      this.getMarkerById({
        locationId: Number(this.$route.query.id),
        callbackFailed: () =>
          this.$toast.error(this.$t('general.errorMessage')),
      })
    }
    setTimeout(() => {
      this.currentMapZoom = 18
    }, 1000)
  },
}
</script>

<style scoped></style>

The following map types are available in the Maps JavaScript API: "roadmap"
displays the default road map view. This is the default map type. "satellite"
displays Google Earth satellite images. "hybrid" displays a mixture of normal
and satellite views. "terrain" displays a physical map based on terrain
information. // { // position: { // lat: 49.23424701332752, lng:
28.46228865225255 // }, // }, // { // position: { // lat: 49.23434701332752,
lng: 28.46228865225255 // }, // }, // { // position: { // lat:
49.23574701332752, lng: 28.46228865225255 // }, // }, // { // position: { //
lat: 49.23934701332752, lng: 28.46228865225255 // }, // }, // { // position: {
// lat: 49.23419601332752, lng: 28.46228865225255 // }, // }, // { // position:
{ // lat: 49.24414701332752, lng: 28.46228865225255 // }, // },
