<template>
	<div class="flex flex-col h-full">
		<Header class="h-[62px] comp:h-[74px] grow-0 shrink-0"/>
		<div class="shrink grow overflow-y-auto pt-[48px] pb-7">

			<div class="bg-white w-full px-6 comp:px-0 comp:w-[480px] mx-auto">
				<div class="text-center title mb-2">
					{{$t("OrganizationRegistration.Welcome")}}
				</div>

				<div class="text-center label mb-6">
					{{$t("OrganizationRegistration.Info")}}
				</div>

				<div class="flex gap-2 justify-center">
					<div v-for="i in 2" class="border border-blue-c-500 h-2 w-2 rounded-xl"
							 :class="{'bg-blue-c-500' : stepNum == i}" @click="GoToStep(i)"/>
				</div>

				<div class="subTitle text-center my-4">{{StepTitle}}</div>

				<div data-step-1 v-if="stepNum==1" >
					<div class="flex flex-col gap-6">
						<Input1 :label="$t('OrganizationRegistration.orgName')"
										:placeholder="$t('dashboard.organizationName')"
										v-model="organization.name"
										:model-value="organization.name"
						/>

						<Input1 :label="$t('OrganizationRegistration.site')"
										placeholder="https//:"
										v-model="organization.site"
						/>

						<Input1 :label="$t('dashboard.address')"
										:placeholder="$t('dashboard.orgAddress')"
										v-model="organization.address"
						/>

						<div data-org-desc>
							<div class="text-h4 text-gray-c-500">
								{{$t("dashboard.orgDescription")}}
							</div>
							<resize-textarea class="text-area my-2 min-h-[144px]"
															 :placeholder="$t('OrganizationRegistration.OrgDescPlaceholder')"
															 v-model="organization.description"
															 ref="orgDesc"
							/>
							<div class="text-h4 text-gray-c-500 text-right">
								{{DescSymbolLimStr}}
							</div>
						</div>

						<div>
							<div class="text-h4 text-gray-c-500">
								{{$t("organizationProfile.logo")}}
							</div>

							<div class="h-[160px] my-2 border border-gray-c-300 rounded-xl grid justify-center content-center">
	<!--							<div class="w-[100px] h-[100px] bg-gray-200 rounded-full grid justify-center content-center">
									<div class="text-gray-c-500 font-medium">
										Logo
									</div>
								</div>-->
								<img ref="logo" src="" class="block w-full h-full object-contain">
							</div>

							<input ref="fileInp" type="file" class="hidden" accept=".jpeg,.png,.jpg" @change.stop="onFileSelect">

							<Button2 class="w-full" @click="selectFile">
								{{$t("organizationProfile.choseFile")}}
							</Button2>
						</div>

					</div>
					<button1 class="w-full mt-10" @click="GoToStep(2)">
						{{$t("general.next")}}
					</button1>
				</div>

				<div data-step-2 v-else-if="stepNum==2">
					<div class="flex flex-col gap-6">
						<Input1 :label="$t('userRegistration.name')"
										:placeholder="$t('userRegistration.fullName')"
										validation-type="name"
										v-model="user.name"/>
						<Input1 :label="$t('userRegistration.email')"
										:placeholder="$t('userRegistration.email')"
										validation-type="mail"
										v-model="user.mail"
										/>
						<InputPass :label="$t('userRegistration.password')"
											 :validation-message="$t('validations.passNotValid')"
												v-model="user.pass"
											 @validation="onPassValid"
						/>
						<InputPass :label="$t('userRegistration.newPassConf')"
											 :validation-message="$t('validations.passNotEquals')"
											 v-model="user.passConfirm"
											 :validation-func="isPassEquals"
											 ref="passConf"
						/>
					</div>

					<div class="flex flex-nowrap gap-6 comp:gap-2 mt-9">
						<Button2 class="grow-[1]" @click="GoToStep(1)">
							{{$t("general.back")}}
						</Button2>
						<Button1 class="grow-[2]" @click="Registration">
							{{$t("general.finish")}}
						</Button1>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "../Header.vue";
import Input1 from "../Inputs/Input-1.vue";
import {mapMutations} from "vuex";
import Button2 from "../Buttons/Button_2.vue";
import Button1 from "../Buttons/Button_1.vue";
import InputPass from "../Inputs/Input-pass.vue";
export default {
	name: "OrgRegistration",
	components: {
		InputPass,
		Button1,
		Button2,
		Header,
		Input1,
	},
	data(){
		return {
			stepNum : 1,
			orgDesc : "",
			descSymbolLim : 300,
			organization : {
				name : "",
				site : "",
				address : "",
				description : "",
				logo : undefined
			},
			user : {
				name : "",
				mail : "",
				pass : "",
				passConfirm : ""
			},
			validation : {
				isPassValid : false,
				isPassEquals : false,
			}
		}
	},
	methods : {
		...mapMutations({
			setLoggedUserInfo : "setLoggedUserInfo",
			setLoggedUserCredentials : "setLoggedUserCredentials"
		}),
		selectFile(){
			this.$refs.fileInp.click();
		},
		onFileSelect(e){
			this.organization.logo = e.target.files[0]
		},
		logOut() {
			this.setLoggedUserInfo(null)
			this.setLoggedUserCredentials(null);
		},
		GoToStep(step){
			this.stepNum = step;
		},
		onPassValid(value){
			this.validation.isPassValid = value;
		},
		isPassEquals(){
			this.validation.isPassEquals = this.user.pass === this.user.passConfirm;
			return this.validation.isPassEquals;
		},
		Registration(){
			console.log(this.organization)
			console.log(this.user);
		}
	},
	computed : {
		StepTitle(){
			let localizeStr;
			switch (this.stepNum){
				case 1 :
					localizeStr = this.$t("OrganizationRegistration.Step1");
					break;
				case 2 :
					localizeStr = this.$t("OrganizationRegistration.Step2");
					break;
				default :
					localizeStr = this.$t("OrganizationRegistration.Step1");
					break;
			}
			return localizeStr;
		},
		DescSymbolLimStr(){
			return `${this.organization.description.length}/${this.descSymbolLim} ${this.$t("general.symbols")}`
		}
	},
	watch : {
		"organization.description"(newVal, oldVal){
			if(newVal.length > this.descSymbolLim) {
				this.organization.description = oldVal;
				this.$refs.orgDesc.textareaContent = oldVal;
			}
		},
		"organization.logo"(newVal){
			console.log(newVal)
			let reader = new FileReader();

			let imgLogo = this.$refs.logo;
			imgLogo.title = newVal.name;

			reader.onload = function(event) {
				imgLogo.src = event.target.result;
			};

			reader.readAsDataURL(newVal);
		},
		"user.pass"(newVal){
			console.log(this.user.passConfirm)
			if(this.user.passConfirm)
				this.$refs.passConf.validation(this.user.passConfirm);
		},
	},
	created() {
		this.logOut();
	}
}
</script>

<style scoped>

</style>