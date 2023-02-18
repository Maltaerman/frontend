<template>
 <Header :is-show-setting="isSettingModalVisible" v-on:settingClose="hideSettings"/>
	<div class="flex h-[calc(100vh-62px)]
	  	comp:h-[calc(100vh-74px)]
	  	mobile:overflow-y-auto
			tablet:overflow-y-auto">
		<div class="shrink-0 comp:w-[320px] shadow-cs1 mobile:hidden">

			<div class="w-full h-[200px] flex flex-col gap-2 place-items-center place-content-center
				shadow-cs2">
				<div class="w-[60px] h-[60px] rounded-full bg-blue-c-100 px-5 py-3">
					<img class="w-full h-full" src="/src/assets/Organizations/Emblem.svg">
				</div>
				<p class="w-min text-h3 text-gray-c-600 font-semibold">
          {{ $t('dashboard.admin') }}
				</p>
			</div>

			<div>
				<MenuItemLink to="/admin/organizations">
					<template #image>
						<SVG_Org_List/>
					</template>
					<template #text>
						{{ $t('dashboard.organizations') }}
					</template>
				</MenuItemLink>
				<MenuItemLink to="/admin/roles">
					<template #image>
						<SVG_Default_User/>
					</template>
					<template #text>
						Roles
					</template>
				</MenuItemLink >

				<div class="group p-1 w-full cursor-pointer h-[58px] flex gap-4
					items-center px-6 text-h3" @click="showSettings">
					<div class="h-5 w-5">
						<SVG_settings class="fill-gray-c-500 group-hover:fill-blue-c-400"/>
					</div>
					<p class="h-min text-gray-c-500 group-hover:text-blue-c-400 font-semibold">{{ $t('dashboard.settings') }}</p>
				</div>

			</div>
 		</div>
		<div class="w-full h-full flex flex-col">
			<router-view class="grow shrink"></router-view>
			<Footer class="w-full grow-0 shrink-0"/>
		</div>
	</div>
</template>

<script>
import Header from "../Header.vue";
import RouterHelper from "../mixins/routerHelper.js";
import MenuItemLink from "../SidebarComponents/MenuItemLink.vue";
import SVG_Org_List from "../ComponentsSVG/MenuItemsSvg/SVG_Org_List.vue";
import SVG_settings from "../ComponentsSVG/SVG_settings.vue";
import SVG_Default_User from "../ComponentsSVG/UserRolesSvg/SVG_Default_User.vue";
export default {
	name: "MainPlatformAdministration",
	mixins : [RouterHelper],
	components : {
		SVG_Default_User,
		SVG_settings,
		SVG_Org_List,
		MenuItemLink,
		Header
	},
	data(){
		return{
			isSettingModalVisible : false
		}
	},
	methods : {
		showSettings(){
			// Тупо, але так треба, бо потрібно затрігерити
			// watch в Header при повторному присвоєні true
			this.isSettingModalVisible = true;
		},
		hideSettings(value){
			this.isSettingModalVisible = value;
		},
	}
}
</script>

<style scoped>

</style>
