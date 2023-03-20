<template>
  <div class="py-4 shadow-cs2 h-min">
    <div class="flex flex-nowrap justify-between relative cursor-pointer group">
   <div>
    <div class="flex flex-nowrap flex-row ">
        <div class="mr-1.5 my-auto h-6 w-8">
          <SVG_status_list :icon="flag" :class-list="getSVGColorClass(flag, flagValue)" />
        </div>
        <p class="grow font-semibold  my-auto uppercase" :class="getTextColorClass(flag, flagValue)">
          {{ GetStatusTranslation(flagValue) }}
        </p>
      </div>
      <p class="text-gray-c-500 text-b3 font-normal my-auto font-normal px-1 mt-1.5">{{ $t('userSideBar.reportedBy') }} <span class="font-semibold">{{organizationName}}</span></p>
   </div>
      <div class="flex flex-col justify-end items-end">
        <p class="text-gray-c-500  text-h4 font-normal my-auto font-normal px-1">{{ $t('userSideBar.reportedOn')}}</p>
        <p class="text-gray-c-500  text-h4 font-semibold my-auto px-1" v-if="update">
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
import SVG_status_list from "../../ComponentsSVG/SVG_status_list.vue";
import dateFormatter from "../../mixins/dateFormatter.js";
import reportItemFlags from "../../mixins/reportItemFlags.js";
import Expander from "../../Other/Expander.vue";

export default {
  name: "ReportStateItem",
  components: { SVG_status_list, Expander },
  mixins: [
    reportItemFlags,
    dateFormatter
  ],
  props: {
    organizationName: String,
    flag: String,
    flagValue: String,
    description: String,
    update: [String, Date],
  },
};
</script>

<style scoped></style>
