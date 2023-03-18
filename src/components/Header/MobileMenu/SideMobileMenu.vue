<template>
	<div class="h-[calc(100%-64px)] fixed z-[100] w-full duration-200" v-if="isVisible"
			 :class="{'bg-black/70' : animTrigger, 'bg-black/0' : !animTrigger}" @click="hide">
		<transition name="appear">
			<div @click.stop class="w-[300px] bg-white shadow-cs1 h-full" v-if="animTrigger">
				<div class="flex flex-nowrap gap-3.5 items-center h-[76px] shadow-cs2 p-4">
					<div class="flex items-center">
						<img :src="currentUserIconLink" class="w-7 h-auto">
					</div>
					<div class="gap-1.5">
						<p class="text-h4 font-semibold whitespace-normal">{{ getUser.username }}</p>
						<p class="text-h4 text-gray-500">{{ getUser.organization_model?.name ?? "" }}</p>
					</div>
				</div>
				<div class="py-0.5">

					<MenuItemLink
						to="/main"
						class="w-full"
						v-if="userRoles === userRoles.aidWorker"
					>
						<template #image>
							<SVG_map/>
						</template>
						<template #text>
							{{ $t("header.map") }}
						</template>
					</MenuItemLink>

					<MenuItemLink
						to="/main/requests"
						class="w-full"
					>
						<template #image>
							<SVG_question/>
						</template>
						<template #text>
							<div class="flex flex-nowrap items-center justify-between w-full">
								<p>
									{{ $t("header.requests") }}
								</p>
								<div
									v-if="requestsCount > 0"
									class="bg-red-c-500 rounded-[32px] py-0.5 px-1 font-semibold text-b3 text-white top-[-15px] right-[-5px] min-w-[22px] text-center"
								>
									{{ requestsCount }}
								</div>
							</div>
						</template>
					</MenuItemLink>

					<MenuItemLink
						v-if="isRoleHaveAccess(user.role, userRoles.organizationAdmin)"
						to="/organization/profile"
						class="w-full"
					>
						<template #image>
							<SVG_Org_List/>
						</template>
						<template #text>
							{{ $t("organizationProfile.organization") }}
						</template>
					</MenuItemLink>

					<MenuItemLink
						v-if="isRoleHaveAccess(user.role, userRoles.organizationAdmin)"
						to="/organization/change-history"
						class="w-full"
					>
						<template #image>
							<SVG_history/>
						</template>
						<template #text>
							{{ $t("userSideBar.change-history") }}
						</template>
					</MenuItemLink>

					<MenuItemLink
						to="/organization/settings"
						class="w-full"
						v-if="isRoleHaveAccess(user.role, userRoles.organizationAdmin)"
					>
						<template #image>
							<SVG_settings/>
						</template>
						<template #text>
							{{ $t("dashboard.settings") }}
						</template>
					</MenuItemLink>

					<button data-settings-button @click="settingButtonAction"
									v-if="user.role === userRoles.aidWorker"
									class="group p-1 w-full cursor-pointer h-[58px] flex gap-4 items-center px-6 text-h3 hover:bg-white">
						<div class="h-5 w-5">
							<SVG_settings class="fill-gray-c-500 group-hover:fill-blue-c-500"/>
						</div>
						<div
							class="h-min group-hover:text-blue-c-400 text-gray-c-500 font-semibold grow text-left">
							{{ $t("header.settings") }}
						</div>
					</button>

					<SideBarMenuLocalizationDpDown class="w-full" @lang-update="hide"/>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import userRoles from "../../mixins/userRoles.js";
import MenuItemLink from "../../SidebarComponents/MenuItemLink.vue";
import SVG_Org_List from "../../ComponentsSVG/MenuItemsSvg/SVG_Org_List.vue";
import SVG_history from "../../ComponentsSVG/MenuItemsSvg/SVG_history.vue";
import SVG_settings from "../../ComponentsSVG/MenuItemsSvg/SVG_settings.vue";
import SVG_map from "../../ComponentsSVG/MenuItemsSvg/SVG_map.vue";
import SVG_question from "../../ComponentsSVG/MenuItemsSvg/SVG_question.vue";
import SideBarMenuLocalizationDpDown from "./SideBarMenuLocalizationDpDown.vue";

export default {
	name: "SideMobileMenu",
	components: {
		SideBarMenuLocalizationDpDown,
		SVG_question, SVG_map, SVG_settings, SVG_history, SVG_Org_List, MenuItemLink
	},
	emits: ["close", "settings"],
	mixins: [userRoles],
	props: {
		user: Object,
		requestsCount: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			isVisible: false,
			animTrigger: false
		}
	},
	methods: {
		show() {
			this.isVisible = true;
			setTimeout(() => this.animTrigger = true, 0)
		},
		hide() {
			this.animTrigger = false;
			setTimeout(() => this.isVisible = false, 100)
		},
		settingButtonAction() {
			this.hide();
			this.$emit("settings")
		}
	},
	computed: {
		currentUserIconLink() {
			switch (this.user.role) {
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
	},
	watch: {
		isVisible(newVal) {
			if (newVal) {
				document.body.style.overflow = "hidden"
			} else {
				document.body.style.overflow = "auto"
			}
		}
	}
}
</script>

<style scoped>
.appear-enter-active,
.appear-leave-active {
	transition: margin-left 0.1s ease;
}

.appear-enter-from, .appear-leave-to {
	margin-left: -300px;
}

.menu-item-mobile {
	@apply px-4 h-[58px] w-full text-gray-c-500 hover:bg-blue-c-200
	p-1  cursor-pointer
	flex gap-4 items-center;
}

</style>