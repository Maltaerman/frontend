import userRoles from "../components/mixins/userRoles.js";
import api from "../http_client/index.js";
import StoreEvents from "./storeEventSystem.js";
import storeEventSystem from "./storeEventSystem.js";
import StoreEventSystem from "./storeEventSystem.js";

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
      if(state.loggedUserInfo)
        state.loggedUserInfo.organization_model = organization
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
      return state.loggedUserInfo.organization_model;
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
    //payload : {
    //    id : int
    //    name : String
    //    website : String
    //    description : String
    //    address : String
    //    city: "string",
    //    country: "string"
    // }
    async EditUserOrganization(context, payload){
      await api.organizations.editOrganization(payload.id, payload)
        .then(res=>{
          console.log(res);
          context.commit("setUserOrganization", res.data);
          StoreEvents.invoke(StoreEventSystem.events.onUserOrganizationUpdate, res.data);
        })
        .catch(err=>{
          console.log(err)
          StoreEvents.invoke(StoreEventSystem.events.onUserOrganizationUpdate, err);
        });
    },
    logOut(context){
      context.commit("setLoggedUserInfo", null)
      context.commit("setLoggedUserCredentials", null)
      context.commit("setUserOrganization", null)
    },
    updateUserOrganizationModel(context, org){
      context.commit("setUserOrganization", org)
    }
  }
}