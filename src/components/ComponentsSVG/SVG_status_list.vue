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

<script>
import SVG_building_condition from '@/components/ComponentsSVG/SVG_building_condition.vue'
import SVG_car_entrance from '@/components/ComponentsSVG/SVG_car_entrance.vue'
import SVG_electricity from '@/components/ComponentsSVG/SVG_electricity.vue'
import SVG_fuel_station from '@/components/ComponentsSVG/SVG_fuel_station.vue'
import SVG_hospital from '@/components/ComponentsSVG/SVG_hospital.vue'
import SVG_water from '@/components/ComponentsSVG/SVG_water.vue'
import reportItemFlags from '@/components/mixins/reportItemFlags.js'

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
