import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import api from '../http_client/index.js'

import OrganizationStore from './OrganizationStore.js'
import ReportLocationState from './ReportedLocationStore.js'
import UserStore from './UserStore.js'

const vuexCookie = new VuexPersistence({
  restoreState: (key) => getCookie(key),
  saveState: (key, state) => setCookie(key, state, 1),
  modules: ['user'],
  filter: CookieUpdateFilter,
  /* filter: (mutation) => mutation.type == 'setLoggedUserInfo' ||
    mutation.type == "setLoggedUserCredentials" || mutation.type == "setUserOrganization"*/
})

function CookieUpdateFilter(mutation) {
  let triggerMutation = [
    'setLoggedUserInfo',
    'setLoggedUserCredentials',
    'setUserOrganization',
    'setLocalization',
  ]
  return triggerMutation.includes(mutation.type)
}

const storePrototype = {
  modules: {
    reports: ReportLocationState,
    user: UserStore,
    organizations: OrganizationStore,
  },
  state() {
    /// данні можна отримати, але не варто змінювати на пряму
    return {
      markers: [],
      unreviewedMarkers: [],
      selectedMarkerData: null,
      selectedMarkerHistoryData: [],
      notFoundedMarkerData: null,
      loggedUserInfo: null,
      loggedUserCredentials: null,
      mapCenter: null,
      defaultMapCenter: {
        lat: 49.23414701332752,
        lng: 28.46228865225255,
      },
    }
  },
  mutations: {
    // функції для зміни даних мають бути СИНХРОННИМИ
    setMarkerList(state, markers) {
      state.markers = markers.filter((mark) => mark.status === 3)
      state.unreviewedMarkers = markers.filter(
        (mark) => mark.status === 1 || mark.status === 2
      )
    },
    setReviewedMarkerList(state, list) {
      state.markers = list.filter((mark) => mark.status === 3)
    },
    setUnreviewedMarkers(state, markers) {
      state.unreviewedMarkers = markers
    },
    setSelectedMarker(state, marker) {
      state.selectedMarkerData = marker
      ////
      state.mapCenter = { ...state.defaultMapCenter }
      state.mapCenter = { ...marker.position }

      state.selectedMarkerHistoryData = []
      state.notFoundedMarkerData = null
    },
    setSelectedMarkerHistory(state, markerHistory) {
      state.selectedMarkerHistoryData = markerHistory
    },
    // marker : {position: coords, address: name}
    setNoDataMarker(state, marker) {
      state.selectedMarkerData = null
      state.notFoundedMarkerData = marker
      ////
      state.mapCenter = { ...marker.position }
    },
    setMapCenter(state, position) {
      state.mapCenter = null
      state.mapCenter = { ...position }
    },
  },
  getters: {
    // функцію для отримання даних зі state з можливістю здійснювати попередні обрахунки
    getMapCenter(state) {
      return state.mapCenter ? state.mapCenter : state.defaultMapCenter
      //return  state.mapCenter ?? undefined
    },
    getSelectedLocationRequest(state) {
      return state.reports.selectedLocationRequest
    },
    getReviewedMarkers(state) {
      return state.markers
    },
    getRequestMarkers(state) {
      return state.unreviewedMarkers ?? []
    },
    notFoundedMarker(state) {
      return state.notFoundedMarkerData ?? null
    },
    selectedReport(state) {
      return state.selectedMarkerData ?? undefined
    },
  },
  actions: {
    // функції для зміни даних шляхом ініціалізації мутацій можуть бути АСИНХРОННИМИ
    async getMarkersByMapCenter(context, payload) {
      await api.locations.searchByMapCenter(payload).then((response) => {
        context.commit('setMarkerList', [...response.data])
      })
    },

    async getSelectedDataHistory(context) {
      if (!context.state.selectedMarkerData) return
      await api.locations
        .getLocationChangeLog(context.state.selectedMarkerData.id)
        .then((response) => {
          console.log(response.data)
          context.commit('setSelectedMarkerHistory', response.data)
        })
    },

    async GetMarkerByCoords(context, { name, position }) {
      await api.locations
        .exactSearch(position.lat, position.lng)
        .then((response) => {
          if (response.data.status === 3)
            context.commit('setSelectedMarker', response.data)
          else if (response.data.id)
            context.commit('setNoDataMarker', response.data)
          else {
            let notFoundAddress = {
              position: response.data.position,
              address: `${response.data.address}, ${response.data.street_number}, ${response.data.city}, ${response.data.index}, ${response.data.country}`,
            }
            context.commit('setNoDataMarker', notFoundAddress)
          }
        })
        .catch(() => {
          let notFoundAddress = {
            position: position,
            address: name,
          }
          context.commit('setNoDataMarker', notFoundAddress)
        })
    },
    /*async getMarkerById (context, locationId) {
      await api.locations.getLocationById(locationId).then((response) => {
        console.log(response.data)
        context.commit("setSelectedMarker", response.data)
      })
    },*/
    async getMarkerById(context, { locationId, callbackFailed }) {
      await api.locations
        .getLocationById(locationId)
        .then((response) => {
          if (response.data.status == 3)
            context.commit('setSelectedMarker', response.data)
          else context.commit('setNoDataMarker', response.data)
        })
        .catch(() => {
          if (callbackFailed) callbackFailed()
        })
    },
    setUnreviewedMarkers(context, markersArray) {
      context.commit('setUnreviewedMarkers', markersArray)
    },
    setNotFoundMarker(context, marker) {
      context.commit('setNoDataMarker', marker)
    },
  },
  plugins: [vuexCookie.plugin],
}

function setCookie(cname, cvalue, exdays = 0) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie =
    cname + '=' + JSON.stringify(cvalue) + ';' + expires + ';path=/'
}
function getCookie(cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return JSON.parse(c.substring(name.length, c.length))
    }
  }
  return {}
}

export const store = createStore(storePrototype)
