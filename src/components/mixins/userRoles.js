import {mapGetters} from "vuex";

export  default {
  data(){
    return  {
      userRoles : {
        user : "user",
        aidWorker : "aid_worker",
        organizationAdmin : "organizational_leader",
        platformAdmin: "platform_administrator"
      }
    }
  },
  computed : {
    ...mapGetters({
      getRole : "getRole",
      getUser : "getUser"
    })
  },
  methods : {
    isRoleHaveAccess(userRole, requireRole){
      let roles = {
        "user" : ["user"],
        "aid_worker" : ["user", "aid_worker"],
        "organizational_leader" : ["user", "aid_worker", "organizational_leader"],
        "platform_administrator" : ["user", "aid_worker", "organizational_leader", "platform_administrator"],
      }
      return roles[userRole].includes(requireRole);
    }
  }
}
