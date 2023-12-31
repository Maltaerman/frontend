import userRoles from "../components/mixins/userRoles.js";
import api from "../http_client/index.js";

export default {
  state(){
    return{
      loggedUserInfo : null,
      loggedUserCredentials : null,
      userOrganization : {name : "..."},
      lang : 'ua'
    }
  },
  mutations : {
    setLoggedUserInfo(state, user){
      state.loggedUserInfo = user;
    },
    setLoggedUserCredentials(state, credentials){
      state.loggedUserCredentials = credentials;
    },
    setUserOrganization(state, organization){
      state.userOrganization = organization
    },
    setLocalization(state, lang){
      state.lang = lang;
    }
  },
  getters : {
    getToken(state){
      if(state.loggedUserCredentials === null )
        return null;
      return `${state.loggedUserCredentials['token_type']} ${state.loggedUserCredentials['access_token']}`;
    },
    isAuth(state){
      return state.loggedUserCredentials !== null && state.loggedUserInfo !== null
    },
    getUser(state){
      return state.loggedUserInfo;
    },
    getUserOrganization(state){
      return state.userOrganization;
    },
    getRole(state){
      if(!state.loggedUserInfo) {
        return userRoles.data().userRoles.user;
      }
      else
        return state.loggedUserInfo.role;
    },
    getLocalization(state){
      return state.lang
    }
  },
  actions : {
    async GetUserOrganization(context) {
      await api.organizations.getOrganizationsById(context.state.loggedUserInfo.organization_model.id)
        .then(res => {
          console.log(res)
          context.commit("setUserOrganization",
            {
              name : res.data.name,
              id : res.data.id,
              website : res.data.website ?? "None",
              email : "Here organization email",
              created_at : (new Date(res.data.created_at)).toLocaleString()
            })
        })
        .catch(err=>{
          console.log(err)
        })
    },
  }
}