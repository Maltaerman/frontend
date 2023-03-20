<template>
  <div class="h-min py-4 shadow-cs2">
    <div class="group relative flex cursor-pointer flex-nowrap justify-between">
      <div>
        <div class="flex flex-row flex-nowrap">
          <div class="my-auto mr-1.5 h-6 w-8">
            <SVG_status_list
              :class-list="getSVGColorClass(flag, flagValue)"
              :icon="flag"
            />
          </div>
          <p
            class="my-auto grow font-semibold uppercase"
            :class="getTextColorClass(flag, flagValue)"
          >
            {{ GetStatusTranslation(flagValue) }}
          </p>
        </div>
        <p
          class="my-auto mt-1.5 px-1 text-b3 font-normal font-normal text-gray-c-500"
        >
          {{ $t('userSideBar.reportedBy') }}
          <span class="font-semibold">{{ organizationName }}</span>
        </p>
      </div>
      <div class="flex flex-col items-end justify-end">
        <p class="my-auto px-1 text-h4 font-normal font-normal text-gray-c-500">
          {{ $t('userSideBar.reportedOn') }}
        </p>
        <p
          v-if="update"
          class="my-auto px-1 text-h4 font-semibold text-gray-c-500"
        >
          {{ GetDateTimeShort(update) }}
        </p>
      </div>
      <div class="tooltip">
        {{ GetFlagToolTip(flag) }}
      </div>
    </div>
    <Expander v-if="description">
      {{ description }}
    </Expander>
  </div>
</template>

<script>
import SVG_status_list from '../../ComponentsSVG/SVG_status_list.vue'
import Expander from '../../Other/Expander.vue'
import dateFormatter from '../../mixins/dateFormatter.js'
import reportItemFlags from '../../mixins/reportItemFlags.js'

export default {
  name: 'ReportStateItem',
  components: { SVG_status_list, Expander },
  mixins: [reportItemFlags, dateFormatter],
  props: {
    organizationName: String,
    flag: String,
    flagValue: String,
    description: String,
    update: [String, Date],
  },
}
</script>

<style scoped></style>
