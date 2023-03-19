<template>
	<div class="h-full w-fit">
		<router-link v-if="!isAuth" to="/" class="h-full w-auto block">
			<img src="/public/logo/Logo.svg" class="h-full w-auto">
		</router-link>
		<div class="h-full" v-else>
			<router-link to="/" class="hidden comp:flex comp:flex-nowrap comp:items-center comp:gap-[18px]">
				<img src="/public/logo/Logo-mini.svg">
				<div>
					<div class="flex flex-nowrap gap-1.5">
						<img :src="currentUserIconLink">
						<p class="text-b3 font-semibold whitespace-normal">{{ getUser.username }}</p>
					</div>
					<div class="text-b3 text-gray-500 mt-0.5">
						{{ getUser.organization_model?.name ?? "" }}
					</div>
				</div>
			</router-link>
			<button @click="showMenu" class="h-full comp:hidden w-10 py-0.5">
				<img src="/public/menu-burger.svg" class="h-full ">
			</button>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import userRoles from "../mixins/userRoles.js";

export default {
	name: "HeaderLogo",
	emits: ["menu"],
	mixins: [userRoles],
	methods: {
		showMenu() {
			this.$emit("menu")
		}
	},
	computed: {
		...mapGetters({
			isAuth: "isAuth",
			getUser: "getUser",
			getRole: "getRole"
		}),
		isDefaultLogo() {
			return !this.isAuth
		},
		currentUserIconLink() {
			switch (this.getRole) {
				case this.userRoles.aidWorker:
					return "/public/userIcons/User.svg";
				case this.userRoles.platformAdmin:
					return "/public/userIcons/platform-adm.svg";
					break;
				case this.userRoles.organizationAdmin:
					return "/public/userIcons/Org-leader.svg";
					break;
				default:
					return "/public/userIcons/User.svg";
			}
		},
	}
}
</script>

<style scoped>

</style>