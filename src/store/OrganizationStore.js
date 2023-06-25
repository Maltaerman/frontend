export default {
  state() {
    return {
      selectedOrganization: null,
    }
  },
  mutations: {
    setSelectedOrganization(state, organization) {
      // eslint-disable-next-line no-param-reassign
      state.selectedOrganization = organization
    },
  },
  getters: {
    getSelectedOrganization(state) {
      return state.selectedOrganization
    },
  },
  actions: {
    setSelectedOrganization(ctx, organization) {
      ctx.commit('setSelectedOrganization', organization)
    },
  },
}
