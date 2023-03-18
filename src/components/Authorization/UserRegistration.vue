<template>
	<div class="flex flex-col h-screen">
		<HeaderV2 class="grow-0 shrink-0 sticky top-0 left-0"/>
		<div class="grow p-4 overflow-y-auto">
			<div class="w-[480px] mobile:w-full mx-auto">
				<div class="text-center text-h1 font-semibold mb-9 text-gray-c-800">
					{{ $t("userRegistration.greeting") }}
				</div>
				<div class="text-center text-body-2 font-semibold mb-6">
					{{ $t("userRegistration.ownProfile") }}
				</div>
				<div>
					<div class="mb-6">
						<label for="user-name" class="block mb-1 text-h4 text-gray-c-500">
							{{ $t("userRegistration.name") }}
						</label>
						<input-1
							tabindex="1"
							inp-id="user-name"
							v-model="userName"
							validation-type="name"
							class="w-full mt-1 outline-none"
							:placeholder="$t('userRegistration.fullName')"
							@validation="onNameValidate"
							:validation-message="
                $t('validations.minNameLength', { amount: 2 })
              "
						/>
					</div>
					<div class="mb-6">
						<label for="user-mail" class="block mb-1 text-h4 text-gray-c-500">
							{{ $t("userRegistration.email") }}
						</label>
						<input-1
							:disabled="true"
							tabindex="2"
							inp-id="user-mail"
							v-model="userMail"
							validation-type="mail"
							class="w-full mt-1 outline-none"
							:placeholder="$t('userRegistration.email')"
							@validation="onMailValidate"
							:validation-message="$t('validations.mailNotValid')"
						/>
					</div>
					<div class="mb-6">
						<label for="user-pass" class="block mb-1 text-h4 text-gray-c-500">
							{{ $t("userRegistration.password") }}
						</label>
						<input-pass
							tabindex="3"
							:validation-message="$t('validations.passNotValid')"
							v-model="pass"
							@validation="onPassValid"
							class="outline-none"
							inp-id="user-pass"
						/>
					</div>
					<div class="mb-6">
						<label
							for="user-pass-conf"
							class="block mb-1 text-h4 text-gray-c-500"
						>
							{{ $t("userRegistration.newPassConf") }}
						</label>
						<input-pass
							tabindex="4"
							v-model="passConfirm"
							class="outline-none"
							inp-id="user-pass-conf"
							:placeholder="$t('userRegistration.passRepeatPlaceholder')"
							:validation-func="isPassEquals"
							:validation-message="$t('validations.passNotEquals')"
						/>
					</div>
				</div>

				<div class="flex gap-2 flex-nowrap items-center mb-9">
					<input
						v-model="isTermsAccept"
						class="block w-6 h-6 accent-blue-c-500 hover:accent-blue-c-400 m-0 p-0"
						type="checkbox"
					/>
					<div>
						{{ $t("userRegistration.terms.part1") }}
						<a tabindex="5" href="" class="link-1" target="_blank">
							{{ $t("userRegistration.terms.part2") }}
						</a>
						{{ $t("userRegistration.terms.part3") }}
						<a tabindex="6" href="" class="link-1" target="_blank">
							{{ $t("userRegistration.terms.part4") }}
						</a>
					</div>
				</div>

				<button-1
					tabindex="7"
					@click="CreateUser"
					class="w-full"
					:disabled="!isRegEnabled"
				>
					{{ $t("userRegistration.createProfile") }}
				</button-1>
			</div>
		</div>
	</div>
	<Loader v-if="isLoaderVisible" class="z-[9999]"/>
</template>
<script>
import input1 from "../Inputs/Input-1.vue";
import InputPass from "../Inputs/Input-pass.vue";
import Button1 from "../Buttons/Button_1.vue";
import regex from "../mixins/regex.js";
import Loader from "../Loader.vue";
import api from "../../http_client/index.js";
import userRoles from "../mixins/userRoles.js";
import {mapActions} from "vuex";

export default {
	name: "UserRegistration",
	components: {
		Loader,
		Button1,
		InputPass,
		input1,
	},
	mixins: [regex, userRoles],
	data() {
		return {
			isTermsAccept: false,
			userName: "",
			userMail: "",
			pass: "",
			passConfirm: "",
			role: undefined,
			isOrgActivated: undefined,
			organizationId: -1,
			isNameValid: false,
			isMailValid: false,
			isPassValid: false,
			isLoaderVisible: false,
			access_token: undefined,
		};
	},
	methods: {
		...mapActions({
			logOut: "logOut",
		}),
		onNameValidate(value) {
			this.isNameValid = value;
		},
		onMailValidate(value) {
			this.isMailValid = value;
		},
		onPassValid(value) {
			this.isPassValid = value;
		},
		isPassEquals() {
			return this.pass === this.passConfirm;
		},
		onRegSuccess() {
			/*if(this.role == this.userRoles.organizationAdmin && !this.isOrgActivated)
				this.$router.push("/organization-registration")
			else*/
			this.$router.push("/welcome");
		},
		async CreateUser() {
			this.isLoaderVisible = true;
			await api.user
				.RegistrationTokenConfirm(
					this.userName,
					this.userMail,
					this.userName,
					this.organizationId,
					this.pass,
					this.access_token
				)
				.then((res) => {
					console.log(res);
					this.isLoaderVisible = false;
					this.$toast.success(this.$t("userRegistration.userRegSuccess"), {
						onClose: this.onRegSuccess,
					});
				})
				.catch((err) => {
					this.isLoaderVisible = false;
					let errMess = this.$t("general.errorMessage");
					if (err.response.status === 400)
						errMess = this.$t("userRegistration.userMailExist", {
							userMail: this.userMail,
						});
					this.$toast.error(errMess, this.$toast.options(false, false));
				});
		},
		//TODO localization
		async GetUserRegInfo() {
			if (!this.$route.query.access_token) {
				this.$toast.error(
					"Некоректне посилання.",
					this.$toast.options(false, false, this.onRegSuccess)
				);
				return;
			}
			this.access_token = this.$route.query.access_token;
			this.$toast.wait("Wait.");
			await api.user
				.VerifyRegistrationToken(this.access_token)
				.then((res) => {
					console.log(res.data);
					//FIXME сигнатура поля зміниться
					this.organizationId = res.data.organization;
					this.userMail = res.data.email;
					this.role = res.data.role;
					this.isOrgActivated = res.data.organization_model.activated;
					this.isMailValid = true;
					this.$toast.clear();
				})
				.catch((err) => {
					let errorMess = "Error";
					this.$toast.clear();
					if (err.response.status === 422) errorMess = "Token is not valid";
					else if (err.response.status === 400)
						errorMess = "Token is either not valid or expired.";
					this.$toast.error(
						errorMess,
						this.$toast.options(false, false, this.onRegSuccess)
					);
				});
		},
	},
	computed: {
		isRegEnabled() {
			return (
				this.isMailValid &&
				this.isNameValid &&
				this.isPassValid &&
				this.isPassEquals() &&
				this.isTermsAccept
			);
		},
	},
	mounted() {
		this.GetUserRegInfo();
		this.logOut();
	},
};
</script>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.link-1 {
	@apply text-blue-c-500 font-semibold;
}
</style>
