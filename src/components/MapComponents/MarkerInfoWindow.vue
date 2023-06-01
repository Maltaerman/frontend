<template>
  <GMapInfoWindow :opened="true">
    <div ref="wrapper" class="w-[240px] rounded-lg">
      <div class="h-6 bg-green-c-200 pt-2">
        <div class="mx-auto h-8 w-8 overflow-visible rounded-full bg-white p-2">
          <SVGBuildingCondition
            :class="
              getSVGColorClass(
                reportFlags.buildingCondition,
                marker.reports.buildingCondition,
              )
            "
          />
        </div>
      </div>
      <div ref="content" class="p-4 text-center text-b3">
        <p class="font-semibold">
          {{ ReportAddressFull(marker) }}
        </p>
        <p>reported on {{ GetDateTimeShort(marker.updated_at) }}</p>
      </div>
    </div>
  </GMapInfoWindow>
</template>

<script>
import SVGBuildingCondition from '../ComponentsSVG/SVG_building_condition.vue'
import dateFormatter from '../mixins/dateFormatter'
import dynamicContent from '../mixins/dynamicContent'
import reportItemFlags from '../mixins/reportItemFlags'

export default {
  name: 'MarkerInfoWindow',
  components: { SVGBuildingCondition },
  mixins: [reportItemFlags, dynamicContent, dateFormatter],
  props: {
    marker: {
      type: Object,
      default: undefined,
    },
  },
}
</script>

<style>
button.gm-ui-hover-effect {
  /*hide marker info window close button must be set in global CSS scope*/
  visibility: hidden !important;
}
.gm-style .gm-style-iw-c {
  padding: 0 !important;
}
</style>
