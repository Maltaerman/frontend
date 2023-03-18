<template>
  <teleport to="body">
    <div
      id="loginModal"
      v-if="isModalVisible"
      class="overflow-y-hidden z-[1050] h-screen w-screen bg-black/30 fixed top-0 left-0 right-0 bottom-0 mobile:px-2 grid place-items-center"
      @click="hide"
    >
      <div
        class="mx-auto rounded-xl px-6 pb-6 pt-9 w-[480px] mobile:w-full h-min bg-white animate-appear relative overflow-hidden flex"
        :class="{ 'animate-disappear': isClosedClick }"
        @click.stop
      >
        <button class="absolute top-5 right-6 h-4 w-4" @click="hide">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z"
              fill="#1D2229"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z"
              fill="black"
              fill-opacity="0.2"
            />
          </svg>
        </button>
        <transition name="modal-anim" mode="out-in">
          <div
            v-if="state === states.login"
            class="text-h2 font-semibold py-1 text-center mobile:text-h2-m tablet:text-h2-m w-full"
          >
            {{ $t("login.header") }}
            <div>
              <Input-1
                name="email"
                ref="emailInput"
                validation-type="mail"
                type="email"
                class="w-full my-6"
                placeholder="Email"
                v-model="email"
                :validation-message="$t('login.error')"
              />
              <Input-pass name="password" class="w-full" v-model="pass" />
              <button-text-1
                class="font-semibold block my-3"
                @click="toPassReset"
              >
                {{ $t("login.resetPassword") }}
              </button-text-1>
              <button-1
                id="loginButton"
                class="block w-full"
                :disabled="isLoginButtonDisabled"
                @click="login"
              >
                {{ $t("login.logIn") }}
              </button-1>
            </div>
          </div>
          <div v-else-if="state === states.error" class="flex flex-col grow">
            <div class="grow flex mobile:flex-col">
              <div class="w-[30px] mobile:w-full">
                <svg
                  width="30"
                  height="30"
                  class="fill-blue-c-400 block mx-auto"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 0.333252C6.89986 0.333252 0.333374 6.89974 0.333374 14.9999C0.333374 23.1001 6.89986 29.6666 15 29.6666C23.1002 29.6666 29.6667 23.1001 29.6667 14.9999C29.6667 6.89974 23.1002 0.333252 15 0.333252ZM3.00004 14.9999C3.00004 8.3725 8.37262 2.99992 15 2.99992C21.6275 2.99992 27 8.3725 27 14.9999C27 21.6273 21.6275 26.9999 15 26.9999C8.37262 26.9999 3.00004 21.6273 3.00004 14.9999ZM15 8.33325C15.7364 8.33325 16.3334 8.93021 16.3334 9.66658V16.3333C16.3334 17.0696 15.7364 17.6666 15 17.6666C14.2637 17.6666 13.6667 17.0696 13.6667 16.3333V9.66658C13.6667 8.93021 14.2637 8.33325 15 8.33325ZM15 21.6666C15.7364 21.6666 16.3334 21.0696 16.3334 20.3333C16.3334 19.5969 15.7364 18.9999 15 18.9999C14.2637 18.9999 13.6667 19.5969 13.6667 20.3333C13.6667 21.0696 14.2637 21.6666 15 21.6666Z"
                  />
                </svg>
              </div>
              <div class="px-4">
                <p class="font-semibold text-blue-c-500">
                  {{ logInErrorMessage.info }}
                </p>
                <p class="py-2">
                  {{ $t("general.cause") }}
                  <span class="font-semibold text-red-c-500">{{
                    logInErrorMessage.detail
                  }}</span>
                </p>
                <p>{{ $t("login.organizationBlockedInfo") }}</p>
              </div>
            </div>

            <button1 @click="toDefaultState" class="w-full mt-6">{{
              $t("login.understood")
            }}</button1>
          </div>
          <div
            v-else-if="state === states.passReset"
            class="text-h2 font-semibold py-1 text-center mobile:text-h2-m tablet:text-h2-m w-full flex flex-col"
          >
            <div class="shrink-0 grow-0">
              {{ $t("login.resetPasswordTitle") }}
            </div>
            <div class="grow grid content-center">
              <Input-1
                name="emailReset"
                ref="emailRestInput"
                validation-type="mail"
                type="email"
                class="w-full my-6"
                placeholder="Email"
                v-model="passResetMail"
              />
              <div class="flex gap-3">
                <button-2
                  id="toLoginButton"
                  class="block w-full"
                  @click="toLogin"
                >
                  {{ $t("general.cancel") }}
                </button-2>
                <button-1
                  id="resetPassButton"
                  class="block w-full"
                  :disabled="!isPassResetMailValid"
                  @click="ResetPasswordRequest"
                >
                  {{ $t("general.confirm") }}
                </button-1>
              </div>
            </div>
          </div>
        </transition>
        <Loader v-if="isLoaderVisible"></Loader>
      </div>
    </div>
  </teleport>
</template>
<script>
import api from "../../http_client/index.js";
import {mapMutations, mapGetters, mapActions} from 'vuex';
import Button1 from "../Buttons/Button_1.vue";
import Loader from "../Loader.vue";
import regex from "../mixins/regex.js";

export default {
	name: "LoginModal",
	components: {Button1, Loader},
	mixins : [regex],
	props : {
		isModalVisible : {
			type : Boolean,
			default : false,
		},
		closeFunc : {
			type : Function,
			required : true
		}
	},
	data(){
		return {
			email : "",
			pass : "",
			passResetMail : "",
      		isClosedClick : false,
			logInErrorMessage : "",
			isLoaderVisible : false,
			state : "login",
			states : {
				login : "login",
				error : "error",
				passReset : "reset"
			},
			apiLoginResponseMapper: {
				"Incorrect username or password": "credentialsError",
				"Cannot authenticate user. Please try again later" : "databaseError",
				"User is Inactive" : "inactiveUser"
			}
		}
	},
	methods : {
		...mapMutations(['setLoggedUserCredentials', 'setLoggedUserInfo']),
		...mapActions(["GetUserOrganization"]),
		hide(){
      this.isClosedClick = true;
      setTimeout( ()=> {
        this.isClosedClick = false;
				this.toDefaultState();
				this.closeFunc();
			}, 400);
		},
		getErrorMessageToDisplay(response) {
			let { detail } = response.data
			let info = ""
			switch (response.status) {
				case 400:
					detail = this.$t(`validations.${this.apiLoginResponseMapper[detail]}`)
					info = this.$t('login.authError')
					break;
				case 500:
					detail = this.$t("validations.databaseError")
					info = this.$t("validations.connectionError")
					break;
				case 404:
					detail = this.$t("validations.error404")
					info = this.$t("validations.connectionError")
					break;
				default:
					info = this.$t("general.errorMessage");
					break;
			}
			return { detail, info }

		},
		async login() {
			if (!this.isLoginButtonDisabled) {
				this.isLoaderVisible = true;
				let credentials = new FormData();
				credentials.append('username', this.email);
				credentials.append('password', this.pass);
				await api.user.LogIn(credentials).then(async res => {
					this.setLoggedUserCredentials(res.data);
					await this.getInfo();
				}).catch(({ response }) => {
					const message = this.getErrorMessageToDisplay(response)
					this.toError(message)
					this.isLoaderVisible = false;
				}
				)
			}
		},
		async getInfo(){
			if(!this.getToken){
				this.toError(this.$t("general.errorMessage"));
			}
			await api.user.GetInfo().then(res=>{
				this.setLoggedUserInfo(res.data);
				//this.GetUserOrganization();
			}).catch(err=>{
				this.toError(err)
			}).finally(()=>{
				this.isLoaderVisible = false;
			})
		},
		async ResetPasswordRequest(){
			if(!this.isPassResetMailValid){
				this.$toast.error(this.$t("validations.mailNotValid"))
				return;
			}
			this.isLoaderVisible = true;
			await api.user.PassResetRequest(this.passResetMail)
				.then(res=>{
					this.isLoaderVisible = false;
          if(res.status === 200){
            this.$toast.success(this.$t("login.passResetReqSend"),
                this.$toast.options(false,true, this.hide)
            )
          }
				})
				.catch(err=> {
					this.isLoaderVisible = false;
          let errMess = "";
          switch (err.response.status){
            case 400:
              errMess = this.$t("login.mailNotExist")
              break;
            default:
              errMess = this.$t("general.errorMessage")
              break;
          }
          this.$toast.error(errMess,
            this.$toast.options(false,true)
          )
				})
		},
		toDefaultState(){
			this.email = ""
			this.pass = ""
			this.logInErrorMessage = "";
			this.isLoaderVisible = false;
			this.toLogin();
		},
		toPassReset(){
			this.state = this.states.passReset;
		},
		toLogin(){
			this.state = this.states.login;
		},
		toError(message){
			this.logInErrorMessage = message;
			this.state = this.states.error;
		},

	},
	computed : {
		...mapGetters(['getToken', 'isAuth']),
		isLoginButtonDisabled(){
			return this.email.length <= 0 || this.pass.length <= 0;
		},
		isPassResetMailValid(){
			return this.isMail(this.passResetMail);
		}
	},
	watch : {
		isAuth(newValue){
			if(newValue)
				this.hide();
		},
		state(newVal){
			switch (newVal){
				case this.states.login:
					this.passResetMail = "";
					break;
			}
		}
	}
}
</script>

<style scoped>
</style>
