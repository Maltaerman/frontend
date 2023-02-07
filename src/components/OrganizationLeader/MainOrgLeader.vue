<template>
<!--	<Header :is-show-setting="isSettingModalVisible" v-on:settingClose="hideSettings"/>
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
				&lt;!&ndash;				<MenuItemLink to="/admin/roles">
									<template #image>
										<SVG_Org_List/>
									</template>
									<template #text>
										Roles
									</template>
								</MenuItemLink >&ndash;&gt;

				<div class="group p-1 w-full cursor-pointer h-[58px] flex gap-4
					items-center px-6 text-h3" @click="showSettings">
					<div class="h-5 w-5">
						<SVG_settings class="fill-gray-c-500 group-hover:fill-blue-c-400"/>
					</div>
					<p class="h-min text-gray-c-500 group-hover:text-blue-c-400 font-semibold">{{ $t('dashboard.settings') }}</p>
				</div>

			</div>
		</div>
		<div class="w-full h-full">
			<router-view></router-view>
		</div>
	</div>-->
</template>

<script>
export default {
	name: "MainOrgLeader"
}
</script>

<style scoped>

</style>