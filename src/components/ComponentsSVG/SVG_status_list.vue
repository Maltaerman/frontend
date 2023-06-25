<template>
  <SVG_building_condition
    v-if="icon === reportFlags.buildingCondition"
    :class="classList"
    :height="height"
    :width="width"
  />
  <SVG_hospital
    v-else-if="icon === reportFlags.hospital"
    :class="classList"
    :height="height"
    :width="width"
  />
  <SVG_car_entrance
    v-else-if="icon === reportFlags.carEntrance"
    :class="classList"
    :height="height"
    :width="width"
  />
  <SVG_electricity
    v-else-if="icon === reportFlags.electricity"
    :class="classList"
    :height="height"
    :width="width"
  />
  <SVG_fuel_station
    v-else-if="icon === reportFlags.fuelStation"
    :class="classList"
    :height="height"
    :width="width"
  />
  <SVG_water
    v-else-if="icon === reportFlags.water"
    :class="classList"
    :height="height"
    :width="width"
  />
</template>

<!-- eslint-disable camelcase -->
<!-- eslint-disable vue/require-default-prop -->
<script>
// eslint-disable-next-line import/extensions
import reportItemFlags from '../mixins/reportItemFlags.js'

import SVG_building_condition from './SVG_building_condition.vue'
import SVG_car_entrance from './SVG_car_entrance.vue'
import SVG_electricity from './SVG_electricity.vue'
import SVG_fuel_station from './SVG_fuel_station.vue'
import SVG_hospital from './SVG_hospital.vue'
import SVG_water from './SVG_water.vue'

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
