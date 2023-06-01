<template>
  <div class="h-min font-medium text-gray-c-600">
    <router-link to="/main">
      <div
        class="inline-block rounded-l-lg border px-3 py-2"
        :class="{
          'border-blue-c-500 bg-blue-c-500 text-white': !isDashboardPage,
          'border-gray-c-300': isDashboardPage,
        }"
      >
        <SVG_map
          class="inline-block comp:hidden"
          :class="{
            'fill-white': !isDashboardPage,
            'fill-gray-c-600': isDashboardPage,
          }"
        />
        <span class="mobile:hidden">
          {{ $t('header.map') }}
        </span>
      </div>
    </router-link>
    <router-link :to="dashboardPath">
      <div
        class="inline-block rounded-r-lg border px-3 py-2"
        :class="{
          'border-blue-c-500 bg-blue-c-500 text-white': isDashboardPage,
          'border-gray-c-300': !isDashboardPage,
        }"
      >
        <SVG_dashboard
          class="hidden"
          :class="{
            'fill-white': isDashboardPage,
            'fill-gray-c-600': !isDashboardPage,
            'mobile:inline': getRole === userRoles.platformAdmin,
          }"
        />
        <SVG_users
          class="hidden"
          :class="{
            'fill-white': isDashboardPage,
            'fill-gray-c-600': !isDashboardPage,
            'mobile:inline': getRole === userRoles.organizationAdmin,
          }"
        />

        <span class="mobile:hidden">
          {{ $t('header.dashboard') }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
import SVG_dashboard from '../ComponentsSVG/MenuItemsSvg/SVG_dashboard.vue'
import SVG_map from '../ComponentsSVG/MenuItemsSvg/SVG_map.vue'
import SVG_users from '../ComponentsSVG/MenuItemsSvg/SVG_users.vue'
import routerHelper from '../mixins/routerHelper'
import userRoles from '../mixins/userRoles'

export default {
  name: 'HeaderRoundedButtons',
  components: { SVG_map, SVG_dashboard, SVG_users },
  mixins: [userRoles, routerHelper],
  props: {
    userRole: String,
  },
  computed: {
    dashboardPath() {
      let path = '/'
      switch (this.userRole) {
        case this.userRoles.organizationAdmin:
          path = '/organization'
          break
        case this.userRoles.platformAdmin:
          path = '/admin'
          break
        default:
          break
      }
      return path
    },
    isDashboardPage() {
      let res = false
      switch (this.getRole) {
        case this.userRoles.organizationAdmin:
          res = this.isPathMatched('/organization')
          break
        case this.userRoles.platformAdmin:
          res = this.isPathMatched('/admin')
          break
        default:
          res = false
      }
      return res
    },
    currentUserIconLink() {
      switch (this.getRole) {
        case this.userRoles.aidWorker:
          return '/userIcons/User.svg'
        case this.userRoles.platformAdmin:
          return '/userIcons/platform-adm.svg'
        default:
          return '/userIcons/User.svg'
      }
    },
  },
}
</script>

<style scoped></style>
