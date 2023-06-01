<template>
  <Header
    :is-show-setting="isSettingModalVisible"
    @settingClose="hideSettings"
  />
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

      <div>
        <MenuItemLink to="/admin/organizations">
          <template #image>
            <SVG_Org_List />
          </template>
          <template #text>
            {{ $t('dashboard.organizations') }}
          </template>
        </MenuItemLink>
        <MenuItemLink to="/admin/roles">
          <template #image>
            <SVG_Default_User />
          </template>
          <template #text> Roles </template>
        </MenuItemLink>

        <div
          class="group flex h-[58px] w-full cursor-pointer items-center gap-4 p-1 px-6 text-h3"
          @click="showSettings"
        >
          <div class="h-5 w-5">
            <SVG_settings class="fill-gray-c-500 group-hover:fill-blue-c-400" />
          </div>
          <p
            class="h-min font-semibold text-gray-c-500 group-hover:text-blue-c-400"
          >
            {{ $t('dashboard.settings') }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex h-full w-full flex-col">
      <router-view class="shrink grow"></router-view>
      <Footer class="w-full shrink-0 grow-0" />
    </div>
  </div>
</template>

<script>
import SVG_Org_List from '../ComponentsSVG/MenuItemsSvg/SVG_Org_List.vue'
import SVG_settings from '../ComponentsSVG/SVG_settings.vue'
import SVG_Default_User from '../ComponentsSVG/UserRolesSvg/SVG_Default_User.vue'
import Header from '../Header/HeaderV2.vue'
import MenuItemLink from '../SidebarComponents/MenuItemLink.vue'
import RouterHelper from '../mixins/routerHelper.js'
export default {
  name: 'MainPlatformAdministration',
  components: {
    SVG_Default_User,
    SVG_settings,
    SVG_Org_List,
    MenuItemLink,
    Header,
  },
  mixins: [RouterHelper],
  data() {
    return {
      isSettingModalVisible: false,
    }
  },
  methods: {
    showSettings() {
      // Тупо, але так треба, бо потрібно затрігерити
      // watch в Header при повторному присвоєні true
      this.isSettingModalVisible = true
    },
    hideSettings(value) {
      this.isSettingModalVisible = value
    },
  },
}
</script>

<style scoped></style>
