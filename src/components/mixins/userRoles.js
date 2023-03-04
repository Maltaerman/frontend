import { mapGetters } from "vuex";

export default {
  data() {
    return {
      userRoles: {
        user: "user",
        aidWorker: "aid_worker",
        organizationAdmin: "organization_administrator",
        platformAdmin: "platform_administrator"
      },
      rolesDisplayText: {
        "User": "user",
        "Aid worker": "aidWorker",
        "Organization leader": "organizationAdmin",
        "Platform administrator": "platformAdmin"
      },
    }
  },
  computed: {
    ...mapGetters({
      getRole: "getRole",
      getUser: "getUser"
    })
  },
  methods: {
    getRoleTextToDisplay(role) {
      return this.$t(`roles.${role}`)
    },
    mapRoleDisplayTextToValue(roleDisplayText){
      return this.rolesDisplayText[roleDisplayText]
    },
    
    isRoleHaveAccess(userRole, requireRole) {
      let roles = {
        "user" : ["user"],
        "aid_worker" : ["user", "aid_worker"],
        "organization_administrator" : ["user", "aid_worker", "organization_administrator"],
        "platform_administrator" : ["user", "aid_worker", "organization_administrator", "platform_administrator"],
      }
      return roles[userRole].includes(requireRole);
    }
  }
}
