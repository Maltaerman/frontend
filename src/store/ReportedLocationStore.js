/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import api from '../http_client/index'

export default {
  state() {
    return {
      selectedLocationRequest: null,
      requestsCount: 0,
    }
  },
  mutations: {
    setSelectedRequestMutation(state, SelectedRequest) {
      state.selectedLocationRequest = SelectedRequest
    },
    setRequestsCount(state, count) {
      state.requestsCount = count
    },
  },
  getters: {
    RequestsCount(state) {
      return state.requestsCount
    },
  },
  actions: {
    setSelectedRequest(context, SelectedRequest) {
      if (!SelectedRequest) return
      context.commit('setSelectedRequestMutation', SelectedRequest)
      context.commit('setMapCenter', SelectedRequest.position)
    },
    async getRequestsCount(context) {
      await api.locations
        .getRequestCount()
        .then((res) => {
          context.commit('setRequestsCount', res.data.count)
        })
        .catch((er) => {
          window.console.error(er)
        })
    },
  },
}

// export const ReportLocationState = createStore(storePrototype);
