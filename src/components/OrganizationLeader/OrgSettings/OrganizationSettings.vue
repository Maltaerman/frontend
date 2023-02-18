<template>
	<div class="px-4 py-6 comp:p-9">
		<div class="flex flex-col gap-6 comp:flex-row comp:justify-between">
			<div class="grow">
				<div class="title">{{$t("dashboard.settings")}}</div>
				<div class="subTitle mb-6 mt-6 comp:mt-9">{{$t("organizationProfile.organizationSettings")}}</div>
				<OrgEditInputsGroup class="comp:max-w-[480px] w-full" v-model="organization"/>
			</div>
			<div>
				<Button1 class="w-full h-min comp:w-min flex flex-nowrap items-center justify-center gap-2"
				@click="editUserOrganization">
					<SVG_save class="fill-white inline-block h-[18px] w-auto"/>
					<p>
						{{$t("general.save")}}
					</p>
				</Button1>
			</div>
		</div>
		<div class="mt-[48px]">
			<div class="subTitle">{{$t("userSettings.personalSettings")}}</div>
			<div class="py-6 flex flex-col gap-6 comp:flex-row comp:justify-between">
				<div class="grow comp:max-w-[480px]">
					<ChangeMailNameInputs v-if="userEditUI.currentState===userEditUI.name" v-model="user"/>
					<ChangePassInputs v-else-if="userEditUI.currentState===userEditUI.pass" v-model="userPassUpdate"/>
					<Button2 @click="UserEditUISwitch" class="w-full comp:w-[200px] mt-6">
						{{ userSettingsButtonText }}
					</Button2>
				</div>
				<div>
					<Button1 class="w-full h-min comp:w-min flex flex-nowrap items-center justify-center gap-2">
						<SVG_save class="fill-white inline-block h-[18px] w-auto"/>
						<p>
							{{$t("general.save")}}
						</p>
					</Button1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import OrgEditInputsGroup from "../Shared/OrgEditInputsGroup.vue";
import {mapActions, mapGetters} from "vuex";
import Button1 from "../../Buttons/Button_1.vue";
import SVG_save from "../../ComponentsSVG/Icons/SVG_save.vue";
import ChangeMailNameInputs from "../../User/ChangeMailNameInputs.vue";
import ChangePassInputs from "../../User/ChangePassInputs.vue";
import Button2 from "../../Buttons/Button_2.vue";
import StoreEvents from "../../../store/storeEventSystem.js";
export default {
	name: "OrganizationSettings",
	components: {
		Button2,
		ChangePassInputs,
		ChangeMailNameInputs,
		SVG_save,
		Button1,
		OrgEditInputsGroup
	},
	data(){
		return {
			organization : undefined,
			user : undefined,
			userPassUpdate : {
				password : "",
				newPassword : ""
			},
			userEditUI : {
				currentState : "name",
				pass : "pass",
				name : "name"
			}
		}
	},
	methods : {
		...mapActions({
			editOrganization : "EditUserOrganization"
		}),
		UserEditUISwitch(){
			switch (this.userEditUI.currentState) {
				case this.userEditUI.name:
					this.userEditUI.currentState = this.userEditUI.pass;
					break;
				case this.userEditUI.pass:
					this.userEditUI.currentState = this.userEditUI.name;
					break
				default:
					break;
			}
		},
		onOgrEdit(org){
			this.$toast.clear();
			console.log(org)
			this.$toast.success("Org name is " + org.name)
		},
		editUserOrganization(){
			let payload ={
				id : this.organization.id,
				name : this.organization.name
			}
			this.editOrganization(payload);
		}
	},
	computed : {
		...mapGetters({
			userOrganization : "getUserOrganization",
			userData : "getUser"
		}),
		userSettingsButtonText(){
			let text = "Error";
			switch (this.userEditUI.currentState) {
				case this.userEditUI.name:
					text = this.$t('userSettings.change-password')
					break;
				case this.userEditUI.pass:
					text = this.$t('general.back');
					break
				default:
					break;
			}
			return text;
		}
	},
	watch : {
		userOrganization(newVal){
			this.organization = {...newVal}
		}
	},
	beforeMount() {
		this.organization = {...this.userOrganization};
		this.user = {...this.userData}
		StoreEvents.subscribe(StoreEvents.events.onUserOrganizationUpdate, this.onOgrEdit);
	},
	beforeUnmount() {
		StoreEvents.unsubscribe(StoreEvents.events.onUserOrganizationUpdate, this.onOgrEdit);
	}
}
</script>

<style scoped>

</style>