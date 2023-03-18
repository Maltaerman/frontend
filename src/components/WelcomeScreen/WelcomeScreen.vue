<template>
	<div
		class="flex flex-nowrap flex-col justify-between h-full overflow-y-auto-custom gap-6"
	>
		<HeaderV2 class="shrink-0 grow-0"/>
		<div
			class="flex flex-col justify-center items-center w-[600px] mx-auto mobile:text-h4 mobile:w-full text-h3 grow shrink px-4"
		>
			<img src="/src/assets/fullLogo.svg" class="inline-block w-[310px]"/>
			<p class="text-gray-c-500 mt-6 text-justify">
				{{ $t("welcomeScreen.helperText") }}
			</p>
			<div
				class="mx-[2.5%] w-full border bg-white rounded-xl border-gray-c-300 border-[2px] h-10 flex flex-nowrap mt-6 mb-9"
				:class="{ 'border-blue-c-500': isInputFocused }"
			>
				<div class="w-[44px] cursor-pointer rounded-xl">
					<img
						alt="search"
						src="/search.svg"
						class="h-full w-full object-scale-down"
					/>
				</div>
				<GMapAutocomplete
					id="autocomplete"
					ref="autocomplete"
					:placeholder="$t('welcomeScreen.searchAddress')"
					@place_changed="GetMarker"
					class="w-full bg-transparent outline-none block text-h3"
					:options="{
            fields: [`geometry`, `name`],
            componentRestrictions: {
              country: [`ua`],
            },
          }"
					@focusin="OnInputFocus(true)"
					@focusout="OnInputFocus(false)"
					v-model="this.searchRequest"
					:select-first-on-enter="true"
				/>
				<div
					class="w-[40px] cursor-pointer rounded-xl"
					@click="this.ClearSearchRequest"
				>
					<img
						id="close-button"
						src="/close.svg"
						alt="close"
						class="h-full w-full object-scale-down"
					/>
				</div>
			</div>

			<div class="w-full" v-if="recentReports.length > 0">
				<div class="font-semibold mb-2 bg-white z-10">
					{{ $t("welcomeScreen.recentlyReports") }}
				</div>
				<WelcomeScreenReportList
					:reports-list="recentReports"
					:delay="5000"
					@report-click="RecentReportClick"
					class="w-full"
				/>
			</div>

			<!--    <div class="bg-gray-c-200 p-6 mt-12">
				<p class="font-semibold text-black">{{ $t('welcomeScreen.examples') }}: </p>
				<p class="mt-4 font-normal">{{ $t('welcomeScreen.firstExample') }}</p>
				<p class="mt-2 font-normal">{{ $t('welcomeScreen.secondExample') }}</p>
			</div>-->
		</div>
		<footer
			class="py-6 mobile:py-5 px-4 gap-6 mobile:gap-3 flex items-center flex-wrap justify-center"
		>
			<div
				class="flex gap-6 flex-nowrap text-h4 text-blue-c-500 font-semibold break-words"
			>
				<a :href="AboutUrl" target="_blank">{{ $t("footer.about") }}</a>
				<a href="https://dimblog.wixsite.com/project-dim" target="_blank">{{
						$t("footer.blog")
					}}</a>
				<a :href="AboutUrl" target="_blank">❤ {{ $t("footer.support") }}</a>
			</div>
			<div
				class="flex gap-4 flex-nowrap text-h4 text-gray-c-400 font-semibold mobile:text-b3"
			>
				<p>{{ $t("footer.ngo") }}</p>
				<p>{{ $t("footer.code") }}</p>
			</div>
		</footer>
	</div>
</template>

<script>
import Test from "../Test.vue";
import {mapState, mapActions, mapMutations} from "vuex";
import SVG_building_condition from "../ComponentsSVG/SVG_building_condition.vue";
import WelcomeScreenReportList from "./WelcomeScreenReportList.vue";
import api from "../../http_client/index.js";
import coordsHelper from "../mixins/coordsHelper.js";
import HeaderV2 from "../Header/HeaderV2.vue";

export default {
	name: "WelcomeScreen",
	mixins: [coordsHelper],
	components: {
		HeaderV2,
		WelcomeScreenReportList,
		SVG_building_condition,
		Test,
	},
	data: function () {
		return {
			searchRequest: null,
			isInputFocused: false,
			recentReports: [],
		};
	},
	methods: {
		...mapActions({
			GetMarkerByCoords: "GetMarkerByCoords",
			getMarkerById: "getMarkerById",
		}),
		...mapMutations({
			setSelectedMarker: "setSelectedMarker",
		}),
		OnInputFocus(arg) {
			this.isInputFocused = arg;
		},
		ClearSearchRequest() {
			let autocomplete = document.getElementById("autocomplete");
			autocomplete.value = "";
		},
		GetMarker(arg) {
			let payload = {};
			try {
				payload = this.coordsFormatter(arg.geometry.location);
			} catch {
				this.$toast.error(
					this.$t("welcomeScreen.requestError", {address: arg.name ?? ""})
				);
				return;
			}
			this.GetMarkerByCoords({position: payload, name: arg.name});
		},
		RecentReportClick(report) {
			this.setSelectedMarker(report);
		},
		async GetRecentReports() {
			await api.locations
				.getRecentReports(20)
				.then((res) => {
					this.recentReports = res.data ?? [];
				})
				.catch((err) => {
					console.error(err);
				});
		},
	},
	computed: {
		...mapState(["selectedMarkerData", "notFoundedMarkerData"]),
		AboutUrl() {
			let url;
			switch (this.$i18n.locale) {
				case "ua":
					url = "https://about.projectdim.org/main.html";
					break;
				case "en":
					url = "https://about.projectdim.org/main-en.html";
					break;
				default:
					url = "https://about.projectdim.org/main.html";
					break;
			}
			return url;
		},
	},
	watch: {
		selectedMarkerData: function (newVal) {
			if (newVal !== null)
				this.$router.push({
					path: "/main/overview",
					query: {id: newVal.id, ...newVal.position},
				});
		},
		notFoundedMarkerData: function (newVal) {
			if (newVal !== null) {
				console.log(newVal);
				this.$router.push({
					path: "/main/overview",
					query: {id: newVal.id, ...newVal.position},
				});
			}
		},
	},
	mounted() {
		this.GetRecentReports();
	},
};
</script>
