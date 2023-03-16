export default {
  state() {
    return {
      selectedOrganization: null,
    };
  },
  mutations: {
    setSelectedOrganization(state, organization) {
      state.selectedOrganization = organization;
    },
  },
  getters: {
    getSelectedOrganization(state) {
      return state.selectedOrganization;
    },
  },
  actions: {
    setSelectedOrganization(ctx, organization) {
      ctx.commit("setSelectedOrganization", organization);
    },
  },
};
