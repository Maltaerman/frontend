<template>
	<div class="flex flex-col h-screen">
		<Header class="grow-0 shrink-0"/>
		<div class="grow flex items-center justify-center p-4 overflow-y-auto">
			<div class="w-[480px] mobile:w-full">
				<div class="text-center text-h1 font-semibold mb-9 text-gray-c-800">
					Відновлення паролю
				</div>
				<div class="text-center text-body-2 font-semibold mb-6">
					Введіть новий пароль
				</div>
				<div>
					<div class="mb-6">
						<label for="user-pass" class="block mb-1 text-h4 text-gray-c-500">
							Новий пароль
						</label>
						<input-pass tabindex="3" :validation-message="$t('validations.passNotValid')"
												v-model="pass" @validation="onPassValid" class="outline-none" inp-id="user-pass"/>
					</div>
					<div class="mb-6">
						<label for="user-pass-conf" class="block mb-1 text-h4 text-gray-c-500">
							Повторіть новий пароль
						</label>
						<input-pass tabindex="4" v-model="passConfirm" class="outline-none" inp-id="user-pass-conf" :placeholder="$t('userRegistration.passRepeatPlaceholder')"
												:validation-func="isPassEquals" :validation-message="$t('validations.passNotEquals')"/>
					</div>
				</div>


				<button-1 :disabled="isButtonDisabled" tabindex="7" class="w-full" @click="ResetPass">
					{{ $t('general.confirm') }}
				</button-1>
			</div>
		</div>
	</div>
	<Loader v-if="isLoaderVisible" class="z-[9999]"/>
</template>

<script>
import regex from "../mixins/regex.js";
import Header from "../Header.vue";
import InputPass from "../Inputs/Input-pass.vue";
import api from "../../http_client/index.js";

export default {
	name: "PasswordReset",
	components : {
		Header,
		InputPass
	},
	mixins : [regex],
	data () {
		return {
			pass : "",
			passConfirm : "",
			isPassValid : false,
			isLoaderVisible : false,
			access_token : undefined
		}
	},
	computed : {
		isButtonDisabled (){
			return !this.isPassValid || !this.isPassEquals()
		}
	},
	methods :{
		onPassValid(value){
			this.isPassValid = value;
		},
		isPassEquals(){
			return this.pass === this.passConfirm;
		},
		onCompleted(){
			this.$router.push("/welcome");
		},
		GetIsResetAvailable(){
			if(!this.$route.query.access_token){
				this.$toast.error("Некоректне посилання.",
					this.$toast.options(false, false, this.onCompleted)
				);
				return;
			}
			this.access_token = this.$route.query.access_token
		},
		//TODO Localization
		async ResetPass(){
			this.isLoaderVisible = true;
			await api.user.PassResetConfirm(this.access_token, this.pass)
				.then(res=>{
					console.log(res)
					this.isLoaderVisible = false;
					this.$toast.success("Пароль успішно змінено", this.$toast.options(false, false, this.onCompleted))
				})
				.catch(err=>{
					console.error(err);
					this.isLoaderVisible = false;

					this.$toast.error("Error", this.$toast.options(false, false))
				})
		}
	},
	mounted() {
		this.GetIsResetAvailable();
	}
}
</script>

<style scoped>

</style>