import {mapGetters} from "vuex";

export  default {
  methods : {
    isPathMatched(url){
      //console.log(this.$route)
      return this.$route.matched.some(x=>x.path===url || x.aliasOf?.path===url)
    },
    GetPathParam(paramName){
      return this.$route.params[paramName] ?? undefined;
    },
  },
  computed : {
    ...mapGetters({
      mapCenter : "getMapCenter"
    })
  },
}
