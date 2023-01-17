<template>
	<Header/>
	<div class="flex h-[calc(100vh-62px)]
	  	comp:h-[calc(100vh-74px)]
	  	mobile:flex-col
	  	tablet:flex-col
	  	mobile:overflow-y-auto
			tablet:overflow-y-auto">
		<div class="shrink-0 comp:w-[600px] z-50 mobile:order-2 tablet:order-2">
			<router-view></router-view>
		</div>
		<div class="w-full p-0 min-h-[456px] mobile:order-1 tablet:order-1">
			<GoogleMap/>
		</div>
	</div>
</template>

<script>
import SideBar from "./SidebarComponents/UserSidebar/SideBar.vue";
import NotFound from "./SidebarComponents/UserSidebar/NotFound.vue";
import GoogleMap from "./MapComponents/GoogleMap.vue";
import Header from "./Header.vue";
import {mapState} from "vuex";

export default {
	name: "MainScreen",
	components : {
		Header,
		SideBar,
		NotFound,
		GoogleMap
	},
  computed : {
		...mapState(["selectedMarkerData", "notFoundedMarkerData"])
	},

}
</script>

<style scoped>

</style>
