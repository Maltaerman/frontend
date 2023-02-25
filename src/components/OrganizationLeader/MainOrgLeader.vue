<template>
	<Header/>
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

			<nav data-sidebar-menu>
				<MenuItemLink to="/organization/profile">
					<template #image>
						<SVG_Org_List/>
					</template>
					<template #text>
						{{ $t('organizationProfile.organization') }}
					</template>
				</MenuItemLink>

				<MenuItemLink to="/organization/change-history">
					<template #image>
						<SVG_history/>
					</template>
					<template #text>
						{{ $t('userSideBar.change-history') }}
					</template>
				</MenuItemLink>

				<MenuItemLink to="/organization/settings">
					<template #image>
						<SVG_settings/>
					</template>
					<template #text>
						{{ $t('dashboard.settings') }}
					</template>
				</MenuItemLink>
			</nav>

		</div>
		<div class="w-full h-full overflow-y-auto">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Header from "../Header.vue";
import SVG_Org_List from "../ComponentsSVG/MenuItemsSvg/SVG_Org_List.vue";
import MenuItemLink from "../SidebarComponents/MenuItemLink.vue";
import SVG_history from "../ComponentsSVG/MenuItemsSvg/SVG_history.vue";
import SVG_settings from "../ComponentsSVG/SVG_settings.vue";
import api from "../../http_client/index.js";
import {mapActions, mapGetters, mapMutations} from "vuex";
import Loader from "../Loader.vue";

export default {
	name: "MainOrgLeader",
	components: {
		Loader,
		SVG_settings,
		SVG_history,
		Header,
		SVG_Org_List,
		MenuItemLink
	},
	data(){
		return {
			isLoader : true,
			organization : {
				name : "",
				site : "",
				address : "",
				description : "",
				logo : undefined
			}
		}
	},
	methods : {
		...mapMutations({
			updateUserOrg : "setUserOrganization"
		}),
		async GetUserOrganization(){
			this.$toast.wait(`${this.$t("general.loading")}...`)
			await api.organizations.getOrganizationsById(this.getUser.organization_model.id)
				.then(res=>{
					this.UpdateUserOrgInStore(res.data);
					this.$toast.clear();
				})
				.catch(err=>{
					this.$toast.clear();
					this.$toast.error(this.$t('general.errorMessage'))
				})
		},
		UpdateUserOrgInStore(org){
			this.updateUserOrg(org);
		}
	},
	computed : {
		...mapGetters({
			userOrganization : "getUserOrganization",
			getUser : "getUser"
		})
	},
	watch : {
		userOrganization(newVal){
			this.organization = newVal;
		}
	},
	mounted() {
		this.GetUserOrganization();
	}
}
</script>

<style scoped>

</style>