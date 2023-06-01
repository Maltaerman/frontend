<template>
  <div
    v-if="isVisible"
    class="fixed z-[100] h-[calc(100%-64px)] w-full duration-200"
    :class="{ 'bg-black/70': animTrigger, 'bg-black/0': !animTrigger }"
    @click="hide"
  >
    <transition name="appear">
      <div
        v-if="animTrigger"
        class="h-full w-[300px] bg-white shadow-cs1"
        @click.stop
      >
        <div
          class="flex h-[76px] flex-nowrap items-center gap-3.5 p-4 shadow-cs2"
        >
          <div class="flex items-center">
            <img class="h-auto w-7" :src="currentUserIconLink" />
          </div>
          <div class="gap-1.5">
            <p class="whitespace-normal text-h4 font-semibold">
              {{ getUser.username }}
            </p>
            <p class="text-h4 text-gray-500">
              {{ getUser.organization_model?.name ?? '' }}
            </p>
          </div>
        </div>
        <div class="py-0.5">
          <MenuItemLink
            v-if="userRoles === userRoles.aidWorker"
            class="w-full"
            to="/main"
          >
            <template #image>
              <SVG_map />
            </template>
            <template #text>
              {{ $t('header.map') }}
            </template>
          </MenuItemLink>

          <MenuItemLink class="w-full" to="/main/requests">
            <template #image>
              <SVG_question />
            </template>
            <template #text>
              <div class="flex w-full flex-nowrap items-center justify-between">
                <p>
                  {{ $t('header.requests') }}
                </p>
                <div
                  v-if="requestsCount > 0"
                  class="top-[-15px] right-[-5px] min-w-[22px] rounded-[32px] bg-red-c-500 py-0.5 px-1 text-center text-b3 font-semibold text-white"
                >
                  {{ requestsCount }}
                </div>
              </div>
            </template>
          </MenuItemLink>

          <MenuItemLink
            v-if="isRoleHaveAccess(user.role, userRoles.organizationAdmin)"
            class="w-full"
            to="/organization/profile"
          >
            <template #image>
              <SVG_Org_List />
            </template>
            <template #text>
              {{ $t('organizationProfile.organization') }}
            </template>
          </MenuItemLink>

          <MenuItemLink
            v-if="isRoleHaveAccess(user.role, userRoles.organizationAdmin)"
            class="w-full"
            to="/organization/change-history"
          >
            <template #image>
              <SVG_history />
            </template>
            <template #text>
              {{ $t('userSideBar.change-history') }}
            </template>
          </MenuItemLink>

          <MenuItemLink
            v-if="isRoleHaveAccess(user.role, userRoles.organizationAdmin)"
            class="w-full"
            to="/organization/settings"
          >
            <template #image>
              <SVG_settings />
            </template>
            <template #text>
              {{ $t('dashboard.settings') }}
            </template>
          </MenuItemLink>

          <button
            v-if="user.role === userRoles.aidWorker"
            class="group flex h-[58px] w-full cursor-pointer items-center gap-4 p-1 px-6 text-h3 hover:bg-white"
            data-settings-button
            @click="settingButtonAction"
          >
            <div class="h-5 w-5">
              <SVG_settings
                class="fill-gray-c-500 group-hover:fill-blue-c-500"
              />
            </div>
            <div
              class="h-min grow text-left font-semibold text-gray-c-500 group-hover:text-blue-c-400"
            >
              {{ $t('header.settings') }}
            </div>
          </button>
          <SideBarMenuLocalizationDpDown class="w-full" @lang-update="hide" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SVG_Org_List from '../../ComponentsSVG/MenuItemsSvg/SVG_Org_List.vue'
import SVG_history from '../../ComponentsSVG/MenuItemsSvg/SVG_history.vue'
import SVG_map from '../../ComponentsSVG/MenuItemsSvg/SVG_map.vue'
import SVG_question from '../../ComponentsSVG/MenuItemsSvg/SVG_question.vue'
import SVG_settings from '../../ComponentsSVG/MenuItemsSvg/SVG_settings.vue'
import MenuItemLink from '../../SidebarComponents/MenuItemLink.vue'
import userRoles from '../../mixins/userRoles'

import SideBarMenuLocalizationDpDown from './SideBarMenuLocalizationDpDown.vue'

export default {
  name: 'SideMobileMenu',
  components: {
    SideBarMenuLocalizationDpDown,
    SVG_question,
    SVG_map,
    SVG_settings,
    SVG_history,
    SVG_Org_List,
    MenuItemLink,
  },
  mixins: [userRoles],
  props: {
    user: Object,
    requestsCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ['close', 'settings'],
  data() {
    return {
      isVisible: false,
      animTrigger: false,
    }
  },
  computed: {
    currentUserIconLink() {
      switch (this.user.role) {
        case this.userRoles.aidWorker:
          return '/public/userIcons/User.svg'
        case this.userRoles.platformAdmin:
          return '/public/userIcons/platform-adm.svg'
        case this.userRoles.organizationAdmin:
          return '/public/userIcons/Org-leader.svg'
        default:
          return '/public/userIcons/User.svg'
      }
    },
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
  },
  methods: {
    show() {
      this.isVisible = true
      setTimeout(() => (this.animTrigger = true), 0)
    },
    hide() {
      this.animTrigger = false
      setTimeout(() => (this.isVisible = false), 100)
    },
    settingButtonAction() {
      this.hide()
      this.$emit('settings')
    },
  },
}
</script>

<style scoped>
.appear-enter-active,
.appear-leave-active {
  transition: margin-left 0.1s ease;
}

.appear-enter-from,
.appear-leave-to {
  margin-left: -300px;
}

.menu-item-mobile {
  @apply flex h-[58px] w-full cursor-pointer items-center
	gap-4  p-1
	px-4 text-gray-c-500 hover:bg-blue-c-200;
}
</style>
