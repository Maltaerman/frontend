import api from "../api/index.js";
import {createStore} from "vuex";


export default {
  state(){
    return{
      selectedLocationRequest : null,
      requestsCount : 0
    }
  },
  mutations : {
    setSelectedRequestMutation (state, SelectedRequest) {
      state.selectedLocationRequest = SelectedRequest
    },
    setRequestsCount(state, count){
      // console.log(`Request count is ${count}`)
      state.requestsCount = count;
    }
  },
  getters : {
    RequestsCount(state){
      return state.requestsCount
    }
  },
  actions : {
    setSelectedRequest (context, SelectedRequest){
      if(!SelectedRequest)
        return;
      context.commit("setSelectedRequestMutation" ,SelectedRequest);
      context.commit('setMapCenter', SelectedRequest.position)
    },
    async getRequestsCount(context){
      await api.locations.getRequestCount().then(res=>{
        context.commit("setRequestsCount", res.data.count);
      }).catch(er=>{
        console.error(er);
      })
    }
  },
}

//export const ReportLocationState = createStore(storePrototype);