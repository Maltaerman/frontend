<template>
	<div class="flex flex-col h-full">
		<HeaderV2 class="h-[62px] comp:h-[74px] grow-0 shrink-0"/>
		<div class="shrink grow overflow-y-auto pt-[48px] pb-7">
			<div class="bg-white w-full px-6 comp:px-0 comp:w-[480px] mx-auto">
				<div class="text-center title mb-2">
					{{ $t("OrganizationRegistration.Welcome") }}
				</div>

				<div class="text-center label mb-6">
					{{ $t("OrganizationRegistration.Info") }}
				</div>

				<!--				<div class="flex gap-2 justify-center">
					<div v-for="i in 2" class="border border-blue-c-500 h-2 w-2 rounded-xl"
							 :class="{'bg-blue-c-500' : stepNum == i}" @click="GoToStep(i)"/>
				</div>-->

				<div class="subTitle text-center my-4">
					{{ $t("OrganizationRegistration.Step1") }}
				</div>

				<!--				<div data-step-1 v-if="stepNum==1">
					<div class="flex flex-col gap-6">
						<Input1 :label="$t('userRegistration.name')"
										:placeholder="$t('userRegistration.fullName')"
										validation-type="name"
										v-model="user.name"
										:model-value="user.name"
						/>
						<Input1 :label="$t('userRegistration.email')"
										:placeholder="$t('userRegistration.email')"
										validation-type="mail"
										v-model="user.mail"
										:model-value="user.mail"
						/>
						<InputPass :label="$t('userRegistration.password')"
											 :validation-message="$t('validations.passNotValid')"
											 v-model="user.pass"
											 :model-value="user.pass"
											 @validation="onPassValid"
						/>
						<InputPass :label="$t('userRegistration.newPassConf')"
											 :validation-message="$t('validations.passNotEquals')"
											 v-model="user.passConfirm"
											 :model-value="user.passConfirm"
											 :validation-func="isPassEquals"
											 ref="passConf"
						/>
					</div>

					<button1 class="w-full mt-10" @click="GoToStep(2)">
						{{$t("general.next")}}
					</button1>
				</div>-->

				<div>
					<OrgEditInputsGroup v-model="organization"/>
					<div class="flex flex-nowrap gap-6 comp:gap-2 mt-9">
						<!--						<Button2 class="grow-[1]" @click="GoToStep(1)">
							{{$t("general.back")}}
						</Button2>-->
						<Button1
							:disabled="!isOrgRegistrationEnabled"
							class="grow-[2]"
							@click="organizationRegistration"
						>
							{{ $t("general.finish") }}
						</Button1>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Input1 from "../Inputs/Input-1.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import Button2 from "../Buttons/Button_2.vue";
import Button1 from "../Buttons/Button_1.vue";
import InputPass from "../Inputs/Input-pass.vue";
import SVG_basket_red from "../ComponentsSVG/SVG_basket_red.vue";
import OrgEditInputsGroup from "./Shared/OrgEditInputsGroup.vue";
import StoreEventSystem from "../../store/storeEventSystem.js";
import StoreEvents from "../../store/storeEventSystem.js";
import HeaderV2 from "../Header/HeaderV2.vue";

export default {
	name: "OrgRegistration",
	components: {
		HeaderV2,
		OrgEditInputsGroup,
		SVG_basket_red,
		InputPass,
		Button1,
		Button2,
		Input1,
	},
	data() {
		return {
			stepNum: 1,
			organization: {
				name: "",
				website: "",
				address: "",
				description: "",
				logo: undefined,
			},
			/*			user : {
				name : "",
				mail : "",
				pass : "",
				passConfirm : ""
			},*/
			validation: {
				isPassValid: false,
				isPassEquals: false,
			},
		};
	},
	methods: {
		...mapActions({
			setUserOrg: "updateUserOrganizationModel",
			EditUserOrganization: "EditUserOrganization",
		}),
		async organizationRegistration() {
			if (!this.isOrgRegistrationEnabled) return;
			let payload = {
				id: this.getUser.organization_model.id,
				name: this.organization.name,
				website: this.organization.website,
				description: this.organization.description,
				address: this.organization.address,
			};
			this.EditUserOrganization(payload);
		},
		checkIsOrgActive() {
			if (
				this.user &&
				this.getUser.organization_model &&
				this.getUser.organization_model.activated
			)
				this.$router.push("/organization");
		},
		OnReg(data) {
			if (data instanceof Error) {
				this.$toast.error(this.$t("general.errorMessage"));
				return;
			}
		},
	},
	computed: {
		...mapGetters({
			getUser: "getUser",
			getUserOrganization: "getUserOrganization",
		}),
		isOrgRegistrationEnabled() {
			return (
				this.organization.name.length > 2 &&
				this.organization.website.length > 4 &&
				this.organization.address.length > 2
			);
		},
	},
	watch: {
		"getUser.organization_model"(newVal) {
			this.checkIsOrgActive();
		},
	},
	beforeUnmount() {
		StoreEvents.unsubscribe(
			StoreEventSystem.events.onUserOrganizationUpdate,
			this.OnReg
		);
	},
	beforeMount() {
		StoreEvents.subscribe(
			StoreEventSystem.events.onUserOrganizationUpdate,
			this.OnReg
		);
		this.checkIsOrgActive();
		this.organization.name = this.getUser.organization_model.name;
	},
};
</script>

<style scoped></style>
