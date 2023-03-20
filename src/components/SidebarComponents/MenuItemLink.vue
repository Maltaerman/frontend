<template>
	<router-link :to="to">
		<div class="group p-1 w-full cursor-pointer h-[58px] flex gap-4
					items-center px-6 text-h3 hover:bg-white"
					:class="{'bg-blue-c-200' : isPathMatched(to)}">
			<div class="h-5 w-5" ref="image_container">
				<slot name="image"></slot>
			</div>
			<div class="h-min group-hover:text-blue-c-400 text-gray-c-500 font-semibold"
					 :class="{'text-blue-c-500' : isPathMatched(to)}">
				<slot name="text"/>
			</div>
		</div>
	</router-link>
</template>

<script>
import routerHelper from "../mixins/routerHelper.js";

export default {
	name: "MenuItemLink",
	mixins : [routerHelper],
	props : {
		to : {
			type : String,
			required: true
		}
	},
	methods : {
		updateSVG(){
			let imgSvg = this.$refs.image_container.firstElementChild;
			if(imgSvg && imgSvg.tagName === "svg"){
				imgSvg.classList.add("w-full", "h-full", "group-hover:fill-blue-c-400");
				if(this.isPathMatched(this.to)){
					imgSvg.classList.add("fill-blue-c-500");
					imgSvg.classList.remove("fill-gray-c-500");
				}
				else{
					imgSvg.classList.add("fill-gray-c-500");
					imgSvg.classList.remove("fill-blue-c-500");
				}
			}
		},

	},
	watch : {
		$route (to, from){
			this.updateSVG()
		}
	},
	mounted() {
		this.updateSVG()
	},
}
</script>

<style scoped>

</style>