<template>
	<SVG_building_condition v-if="this.icon===reportFlags.buildingCondition" :class="this.classList"
                          :width="this.width" :height="this.height"/>
	<SVG_hospital v-else-if="this.icon===reportFlags.hospital" :class="this.classList"
                :width="this.width" :height="this.height"/>
	<SVG_car_entrance v-else-if="this.icon===reportFlags.carEntrance" :class="this.classList"
                    :width="this.width" :height="this.height"/>
	<SVG_electricity v-else-if="this.icon===reportFlags.electricity" :class="this.classList"
                   :width="this.width" :height="this.height"/>
	<SVG_fuel_station v-else-if="this.icon===reportFlags.fuelStation" :class="this.classList"
                    :width="this.width" :height="this.height"/>
	<SVG_water v-else-if="this.icon===reportFlags.water" :class="this.classList"
             :width="this.width" :height="this.height"/>
</template>

<script>
import SVG_building_condition from "./SVG_building_condition.vue";
import SVG_hospital from "./SVG_hospital.vue";
import SVG_electricity from "./SVG_electricity.vue";
import SVG_fuel_station from "./SVG_fuel_station.vue";
import SVG_water from "./SVG_water.vue";
import SVG_car_entrance from "./SVG_car_entrance.vue";
import reportItemFlags from "../mixins/reportItemFlags.js";

export default {
	name: "SVG_status_list",
  mixins: [reportItemFlags],
	components: {
		SVG_water,
		SVG_fuel_station,
		SVG_electricity,
		SVG_hospital,
    SVG_car_entrance,
		SVG_building_condition
  },
	props : {
		icon : String,
		classList : String,
		width : [Number, String],
		height : [Number, String]
	}
}
</script>

<style scoped>

</style>
