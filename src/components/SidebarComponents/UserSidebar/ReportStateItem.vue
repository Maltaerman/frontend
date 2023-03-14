<template>
  <div class="py-4 shadow-cs2 h-min">
    <div class="flex flex-nowrap relative cursor-pointer group">
      <div class="mr-1.5 my-auto h-6 w-8">
        <SVG_status_list
          :class-list="getSVGColorClass(flag, flagValue)"
          :icon="flag"
        />
      </div>
      <p
        class="grow font-semibold my-auto uppercase"
        :class="getTextColorClass(flag, flagValue)"
      >
        {{ GetStatusTranslation(flagValue) }}
      </p>
      <p v-if="update" class="text-gray-c-500 my-auto font-normal px-1">
        {{ GetDateTimeShort(update) }}
      </p>

      <div class="tooltip">
        {{ GetFlagToolTip(flag) }}
      </div>
    </div>

    <BaseExpander v-if="description">
      {{ description }}
    </BaseExpander>
  </div>
</template>

<script>
import SVG_status_list from '../../ComponentsSVG/SVG_status_list.vue'
import BaseExpander from '../../Other/BaseExpander.vue'
import dateFormatter from '../../mixins/dateFormatter.js'
import reportItemFlags from '../../mixins/reportItemFlags.js'

export default {
  name: 'ReportStateItem',
  components: { SVG_status_list, BaseExpander },
  mixins: [reportItemFlags, dateFormatter],
  props: {
    flag: String,
    flagValue: String,
    description: String,
    update: [String, Date],
  },
}
</script>

<style scoped></style>
