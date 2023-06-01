<template>
  <Header/>
  <div
    class="flex h-[calc(100vh-62px)] comp:h-[calc(100vh-74px)] tablet:overflow-y-auto mobile:overflow-y-auto"
  >
    <div class="shrink-0 shadow-cs1 comp:w-[320px] mobile:hidden">
      <div
        class="flex h-[200px] w-full flex-col place-content-center place-items-center gap-2 shadow-cs2"
      >
        <div class="h-[60px] w-[60px] rounded-full bg-blue-c-100 px-5 py-3">
          <img
            class="h-full w-full"
            src="/src/assets/Organizations/Emblem.svg"
          />
        </div>
        <p class="w-min text-h3 font-semibold text-gray-c-600">
          {{ $t('dashboard.admin') }}
        </p>
      </div>

      <nav data-sidebar-menu>
        <MenuItemLink to="/organization/profile">
          <template #image>
            <SVG_Org_List />
          </template>
          <template #text>
            {{ $t('organizationProfile.organization') }}
          </template>
        </MenuItemLink>

        <MenuItemLink to="/organization/change-history">
          <template #image>
            <SVG_history />
          </template>
          <template #text>
            {{ $t('userSideBar.change-history') }}
          </template>
        </MenuItemLink>

        <MenuItemLink to="/organization/settings">
          <template #image>
            <SVG_settings />
          </template>
          <template #text>
            {{ $t('dashboard.settings') }}
          </template>
        </MenuItemLink>
      </nav>
    </div>
    <div class="h-full w-full overflow-y-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import api from '../../http_client/index.js'
import SVG_Org_List from '../ComponentsSVG/MenuItemsSvg/SVG_Org_List.vue'
import SVG_history from '../ComponentsSVG/MenuItemsSvg/SVG_history.vue'
import SVG_settings from '../ComponentsSVG/SVG_settings.vue'
import Header from '../Header/HeaderV2.vue'
import MenuItemLink from '../SidebarComponents/MenuItemLink.vue'

export default {
  name: 'MainOrgLeader',
  components: {
    SVG_settings,
    SVG_history,
    Header,
    SVG_Org_List,
    MenuItemLink,
  },
  data() {
    return {
      isLoader: true,
      organization: {
        name: '',
        site: '',
        address: '',
        description: '',
        logo: undefined,
      },
    }
  },
  computed: {
    ...mapGetters({
      userOrganization: 'getUserOrganization',
      getUser: 'getUser',
    }),
  },
  watch: {
    userOrganization(newVal) {
      this.organization = newVal
    },
  },
  mounted() {
    this.GetUserOrganization()
  },
  methods: {
    ...mapMutations({
      updateUserOrg: 'setUserOrganization',
    }),
    async GetUserOrganization() {
      this.$toast.wait(`${this.$t('general.loading')}...`)
      await api.organizations
        .getOrganizationsById(this.getUser.organization_model.id)
        .then((res) => {
          this.UpdateUserOrgInStore(res.data)
          this.$toast.clear()
        })
        .catch(() => {
          this.$toast.clear()
          this.$toast.error(this.$t('general.errorMessage'))
        })
    },
    UpdateUserOrgInStore(org) {
      this.updateUserOrg(org)
    },
  },
}
</script>

<style scoped></style>
