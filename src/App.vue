<template>
  <router-view></router-view>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import routerHelper from './components/mixins/routerHelper.js'
import userRoles from './components/mixins/userRoles.js'
import api from './http_client'

export default {
  name: 'App',
  mixins: [userRoles, routerHelper],
  data() {
    return {
      UpdateRequestCountTimeout: 300000,

      updateId: undefined,
      onPageChangeEvents: [this.CheckIsOrgActive],
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'getLocalization', 'getUser']),
  },
  watch: {
    isAuth: function (newValue) {
      this.UpdateRequestCount()

      if (newValue) {
        this.CheckIsOrgActive()
      } else {
        if (this.updateId) clearTimeout(this.updateId)
      }
    },
    $route: function (newValue) {
      if (newValue) {
        this.CheckIsOrgActive()
        //this.onPageChangeEvents.forEach(func=>func())
      } else {
        if (this.updateId) clearTimeout(this.updateId)
      }
    },
  },
  created() {
    this.UpdateRequestCount()
    this.LoadPhoneCodes()
  },

  methods: {
    ...mapActions(['getRequestsCount']),
    ...mapMutations(['setPhoneCodes']),
    UpdateRequestCount() {
      if (this.isAuth) {
        this.getRequestsCount()
        this.updateId = setTimeout(
          this.UpdateRequestCount,
          this.UpdateRequestCountTimeout,
        )
      }
    },
    //if user is org leader and organization is not activated
    //move user to org registration page
    CheckIsOrgActive() {
      if (
        this.getUser &&
        this.getUser.role === this.userRoles.organizationAdmin &&
        !this.getUser.organization_model.activated
      )
        this.$router.push('/organization-registration')
      //else
      //	this.onPageChangeEvents.splice(this.onPageChangeEvents.indexOf(this.CheckIsOrgActive), 1);
    },
    LoadPhoneCodes(){
      api.guest.getPhoneCodes()
        .then(res=>{
          this.setPhoneCodes(res.data)
        })
        .catch(err=>{
          console.error(err)
        })
    }
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
* {
  font-family: 'Inter', sans-serif;
}
</style>
