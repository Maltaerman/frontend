import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      userRoles: {
        user: 'user',
        aidWorker: 'aid_worker',
        organizationAdmin: 'organizational_leader',
        platformAdmin: 'platform_administrator',
      },
      rolesDisplayText: {
        User: 'user',
        'Aid worker': 'aidWorker',
        'Organization leader': 'organizationAdmin',
        'Platform administrator': 'platformAdmin',
      },
    }
  },
  computed: {
    ...mapGetters({
      getRole: 'getRole',
      getUser: 'getUser',
    }),
  },
  methods: {
    getRoleTextToDisplay(role) {
      return role ? this.$t(`roles.${role}`) : this.$t('roles.noRole')
    },
    mapRoleDisplayTextToValue(roleDisplayText) {
      return this.rolesDisplayText[roleDisplayText]
    },

    isRoleHaveAccess(userRole, requireRole) {
      if (!userRole) {
        window.console.log(
          'isRoleHaveAccess method user role is FALSE or NULL Oor UNDEFINED',
        )
        return false
      }
      const roles = {
        user: ['user'],
        aid_worker: ['user', 'aid_worker'],
        organizational_leader: ['user', 'aid_worker', 'organizational_leader'],
        platform_administrator: [
          'user',
          'aid_worker',
          'organizational_leader',
          'platform_administrator',
        ],
      }
      return roles[userRole].includes(requireRole)
    },
  },
}
