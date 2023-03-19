<template>
	<div id="header-container" class="h-[62px] comp:h-[72px]">
		<header class="header fixed top-0 z-[100] bg-white">
			<HeaderLogo @menu="showMenu"/>
			<div deta-right-part-header class="flex flex-nowrap items-center gap-8">
				<HeaderLocalizationDropDown :class="{'mobile:hidden' : isAuth}"/>

				<HeaderRoundedButtons v-if="isRoleHaveAccess(getRole, userRoles.organizationAdmin)" :user-role="getRole"/>

				<div data-aid-worker-buttons class="flex-nowrap gap-[26px] hidden comp:flex" v-if="isAuth">
					<button @click="showSettings" v-if="getRole===userRoles.aidWorker">
						<SVG_settings class="fill-blue-c-500"/>
					</button>
					<router-link to="/main/requests" class="block relative">
						<img src="/public/question-mark.svg" alt="">
						<div
							v-if="RequestsCount > 0"
							class="absolute bg-red-c-500 rounded-[32px] py-0.5 px-1 font-semibold text-b3 text-white top-[-15px] right-[-5px] min-w-[22px] text-center"
						>
							{{ RequestsCount }}
						</div>
					</router-link>
				</div>

				<button class="text-blue-c-500 text-body-1 font-medium" @click="logButtonAction">
					{{ logButtonContent }}
				</button>
			</div>
		</header>
	</div>

	<LoginModal :is-modal-visible="isLoginModal" :close-func="closeModal"/>
	<UserSetting
		:is-setting-visible="isSettingModal"
		v-if="isAuth"
		@close="closeModal"
	/>
	<SideMobileMenu v-if="isAuth" :user="getUser" :requests-count="RequestsCount" ref="menu" @settings="showSettings"/>

</template>

<script>
import HeaderLogo from "./HeaderLogo.vue";
import HeaderLocalizationDropDown from "./HeaderLocalizationDropDown.vue";
import {mapActions, mapGetters} from "vuex";
import SVG_settings from "../ComponentsSVG/MenuItemsSvg/SVG_settings.vue";
import SVG_question from "../ComponentsSVG/MenuItemsSvg/SVG_question.vue";
import LoginModal from "../Authorization/LoginModal.vue";
import UserSetting from "../UserSetting.vue";
import SideMobileMenu from "./MobileMenu/SideMobileMenu.vue";
import HeaderRoundedButtons from "./HeaderRoundedButtons.vue";
import userRoles from "../mixins/userRoles.js";

export default {
	name: "HeaderV2",
	mixins: [userRoles],
	components: {
		HeaderRoundedButtons,
		SideMobileMenu,
		UserSetting, LoginModal, SVG_question, SVG_settings, HeaderLocalizationDropDown, HeaderLogo
	},
	data() {
		return {
			isLoginModal: false,
			isSettingModal: false,
			isMenu: false
		}
	},
	methods: {
		...mapActions({
			logOut: "logOut",
			getRequestsCount: "getRequestsCount"
		}),
		showMenu() {
			if (this.$refs.menu) {
				if (this.$refs.menu.isVisible)
					this.$refs.menu.hide();
				else
					this.$refs.menu.show();
			}
		},
		logButtonAction() {
			if (!this.isAuth)
				this.isLoginModal = true;
			else {
				this.$router.push("/");
				this.logOut();
			}
		},
		showSettings() {
			this.isSettingModal = true;
		},
		closeModal() {
			this.isLoginModal = false;
			this.isSettingModal = false
			this.$refs.menu.hide();
		}
	},
	computed: {
		...mapGetters({
			isAuth: "isAuth",
			getUser: "getUser",
			getRole: "getRole",
			RequestsCount: "RequestsCount"
		}),
		logButtonContent() {
			return this.isAuth ? this.$t("header.logout") : this.$t("header.login")
		}
	},
	watch: {
		$route: {
			handler(newVal) {
				if (this.$refs.menu)
					this.$refs.menu.hide()
			},
			deep: true
		}
	}
}
</script>

<style scoped>
.header {
	@apply h-[62px] comp:h-[72px]
	px-4 py-[19px] comp:px-6 comp:py-4 flex flex-nowrap justify-between
	shadow-cs2 w-full
}
</style>