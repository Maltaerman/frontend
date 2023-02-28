import userRoles from "../components/mixins/userRoles.js";
import api from "../http_client/index.js";
import StoreEvents from "./storeEventSystem.js";

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
    },
    setUserOrganizationModel(state, model){
      state.loggedUserInfo.organziation_model = model
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
    async GetUserOrganizationAction(context) {
      await api.organizations.getOrganizationsById(context.state.loggedUserInfo.organization_model.id)
        .then(res => {
          console.log(res)
          context.commit("setUserOrganization",
            {
              name: res.data.name,
              id: res.data.id,
              website: res.data.website ?? "None",
              email: "Here organization email",
              created_at: (new Date(res.data.created_at)).toLocaleString()
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    //payload : {
    //    id : int
    //    name : String
    //    website : String
    //    description : String
    //    address : String
    //    city: "string",
    //    country: "string"
    // }
    async EditUserOrganization(context, payload) {
      await api.organizations.editOrganization(payload.id, payload)
        .then(res => {
          context.commit("setUserOrganization", res.data);
          context.commit("setUserOrganizationModel", {
            id : res.data.id,
            name : res.data.name,
            activated : res.data.activated,
            disabled : res.data.disabled
          })
          StoreEvents.invoke(StoreEvents.events.onUserOrganizationUpdate, res.data);
        })
        .catch(err => {
          console.log(err)
          StoreEvents.invoke(StoreEvents.events.onUserOrganizationUpdate, err);
        });
    },
    //  payload : {
    //    username : string,
    //    email : string
    //  }
    async EditUserData(context, payload){
      await api.user.UpdateUserData(payload)
        .then(res=>{
          context.commit("setLoggedUserInfo", res.data)
          StoreEvents.invoke(StoreEvents.events.onUserDataUpdate, res.data);
        })
        .catch(err=>{
          StoreEvents.invoke(StoreEvents.events.onUserDataUpdate, err);
        })
    },
    async updateUserPassword(context, payload){
      await api.user.UpdateUserPass(payload)
        .then(res=>{
          StoreEvents.invoke(StoreEvents.events.onUserPasswordUpdate, res.data);
        })
        .catch(err=>{
          StoreEvents.invoke(StoreEvents.events.onUserPasswordUpdate, err);
        })
    },
    async GetOrganizationChangeLog(context, payload){
      await api.changelogs.getOrganizationChangeLog(payload)
        .then(res=>{
          StoreEvents.invoke(StoreEvents.events.onOrganizationChangeLogUpdate, res.data)
        })
        .catch(err=>{
          StoreEvents.invoke(StoreEvents.events.onOrganizationChangeLogUpdate, err)
        })
    },
    logOut(context){
      context.commit("setUserOrganization", null)
      context.commit("setLoggedUserInfo", null)
      context.commit("setLoggedUserCredentials", null)
    },
    updateUserOrganizationModel(context, org){
      context.commit("setUserOrganization", org)
    }
  }
}