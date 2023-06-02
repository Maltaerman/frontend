<template>
  <header
    id="header-container"
    class="header sticky top-0 z-[100] h-[62px] bg-white bg-yellow-400 comp:h-[72px]"
  >
    <HeaderLogo @menu="showMenu" />
    <div class="flex flex-nowrap items-center gap-8" deta-right-part-header>
      <HeaderLocalizationDropDown :class="{ 'mobile:hidden': isAuth }" />

      <HeaderRoundedButtons
        v-if="isRoleHaveAccess(getRole, userRoles.organizationAdmin)"
        :user-role="getRole"
      />

      <div
        v-if="isAuth"
        class="hidden flex-nowrap gap-[26px] comp:flex"
        data-aid-worker-buttons
      >
        <button v-if="getRole === userRoles.aidWorker" @click="showSettings">
          <SVG_settings class="fill-blue-c-500" />
        </button>
        <router-link class="relative block" to="/main/requests">
          <img alt="" src="/question-mark.svg" />
          <div
            v-if="RequestsCount > 0"
            class="absolute top-[-15px] right-[-5px] min-w-[22px] rounded-[32px] bg-red-c-500 py-0.5 px-1 text-center text-b3 font-semibold text-white"
          >
            {{ RequestsCount }}
          </div>
        </router-link>
      </div>

      <button
        class="text-body-1 font-medium text-blue-c-500"
        @click="logButtonAction"
      >
        {{ logButtonContent }}
      </button>
    </div>
  </header>
  <LoginModal :close-func="closeModal" :is-modal-visible="isLoginModal" />
  <UserSetting
    v-if="isAuth"
    :is-setting-visible="isSettingModal"
    @close="closeModal"
  />
  <SideMobileMenu
    v-if="isAuth"
    ref="menu"
    :requests-count="RequestsCount"
    :user="getUser"
    @settings="showSettings"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import LoginModal from '../Authorization/LoginModal.vue'
import SVG_settings from '../ComponentsSVG/MenuItemsSvg/SVG_settings.vue'
import UserSetting from '../UserSetting.vue'
import userRoles from '../mixins/userRoles'

import HeaderLocalizationDropDown from './HeaderLocalizationDropDown.vue'
import HeaderLogo from './HeaderLogo.vue'
import HeaderRoundedButtons from './HeaderRoundedButtons.vue'
import SideMobileMenu from './MobileMenu/SideMobileMenu.vue'

export default {
  name: 'HeaderV2',
  components: {
    HeaderRoundedButtons,
    SideMobileMenu,
    UserSetting,
    LoginModal,
    SVG_settings,
    HeaderLocalizationDropDown,
    HeaderLogo,
  },
  mixins: [userRoles],
  data() {
    return {
      isLoginModal: false,
      isSettingModal: false,
      isMenu: false,
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'isAuth',
      getUser: 'getUser',
      getRole: 'getRole',
      RequestsCount: 'RequestsCount',
    }),
    logButtonContent() {
      return this.isAuth ? this.$t('header.logout') : this.$t('header.login')
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.$refs.menu) this.$refs.menu.hide()
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      logOut: 'logOut',
      getRequestsCount: 'getRequestsCount',
    }),
    showMenu() {
      if (this.$refs.menu) {
        if (this.$refs.menu.isVisible) this.$refs.menu.hide()
        else this.$refs.menu.show()
      }
    },
    logButtonAction() {
      if (!this.isAuth) this.isLoginModal = true
      else {
        this.$router.push('/')
        this.logOut()
      }
    },
    showSettings() {
      this.isSettingModal = true
    },
    closeModal() {
      this.isLoginModal = false
      this.isSettingModal = false
      this.$refs.menu.hide()
    },
  },
}
</script>

<style scoped>
.header {
  @apply flex h-[62px]
	w-full flex-nowrap justify-between px-4 py-[19px] shadow-cs2 comp:h-[72px]
	comp:px-6 comp:py-4;
}
</style>
