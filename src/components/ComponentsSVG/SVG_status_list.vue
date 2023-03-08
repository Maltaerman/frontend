<template>
  <SVG_building_condition
    v-if="icon === reportFlags.buildingCondition"
    :class="classList"
    :width="width"
    :height="height"
  />
  <SVG_hospital
    v-else-if="icon === reportFlags.hospital"
    :class="classList"
    :width="width"
    :height="height"
  />
  <SVG_car_entrance
    v-else-if="icon === reportFlags.carEntrance"
    :class="classList"
    :width="width"
    :height="height"
  />
  <SVG_electricity
    v-else-if="icon === reportFlags.electricity"
    :class="classList"
    :width="width"
    :height="height"
  />
  <SVG_fuel_station
    v-else-if="icon === reportFlags.fuelStation"
    :class="classList"
    :width="width"
    :height="height"
  />
  <SVG_water
    v-else-if="icon === reportFlags.water"
    :class="classList"
    :width="width"
    :height="height"
  />
</template>

<script>
import SVG_building_condition from './SVG_building_condition.vue'
import SVG_hospital from './SVG_hospital.vue'
import SVG_electricity from './SVG_electricity.vue'
import SVG_fuel_station from './SVG_fuel_station.vue'
import SVG_water from './SVG_water.vue'
import SVG_car_entrance from './SVG_car_entrance.vue'
import reportItemFlags from '../mixins/reportItemFlags.js'

export default {
  name: 'SVGStatusList',
  components: {
    SVG_water,
    SVG_fuel_station,
    SVG_electricity,
    SVG_hospital,
    SVG_car_entrance,
    SVG_building_condition,
  },
  mixins: [reportItemFlags],
  props: {
    icon: String,
    classList: String,
    width: [Number, String],
    height: [Number, String],
  },
}
</script>

<style scoped></style>
