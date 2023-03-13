<template>
  <transition-group
    class="flex flex-col flex-nowrap overflow-hidden container-height"
    name="report-appear"
    tag="div"
  >
    <div
      v-for="report in visibleElements"
      :key="`rep${report.id}`"
      class="item-height flex flex-nowrap items-center w-full group hover:bg-blue-c-100 shrink-0 grow-0 cursor-pointer"
      @click="OnReportClick(report)"
    >
      <div
        class="w-0.5 h-3/5 bg-gray-c-300 group-hover:h-full group-hover:bg-blue-c-400 duration-200 shrink-0 grow-0"
      />
      <div class="grow-0 h-full py-2 pr-4 pl-3.5 grow-0 shrink-0">
        <div
          class="text-h4 mobile:text-b3 group-hover:text-blue-c-400 group-hover:font-semibold duration-100"
        >
          {{ ReportAddressFull(report) }}
        </div>
        <div
          class="flex flex-nowrap pt-1 items-center font-semibold text-b3 gap-2 text-gray-c-500"
        >
          <div
            class="bg-white rounded-2xl border border-gray-c-200 px-2 py-0.5"
            :class="
              getTextColorClass(
                reportFlags.buildingCondition,
                report.reports.buildingCondition.flag
              )
            "
          >
            <div class="h-3 w-3 inline-block">
              <SVG_building_condition
                class="h-full w-full"
                :class="
                  getSVGColorClass(
                    reportFlags.buildingCondition,
                    report.reports.buildingCondition.flag
                  )
                "
              />
            </div>
            {{ GetStatusTranslation(report.reports.buildingCondition.flag) }}
          </div>
          <div class="font-normal">
            {{ GetDateTimeShort(report.updated_at) }}
          </div>
          <div>
            {{ report.organization_name }}
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import SVG_building_condition from '../ComponentsSVG/SVG_building_condition.vue'
import dateFormatter from '../mixins/dateFormatter.js'
import dynamicContent from '../mixins/dynamicContent.js'
import reportItemFlags from '../mixins/reportItemFlags.js'

export default {
  name: 'WelcomeScreenReportList',
  components: {
    SVG_building_condition,
  },
  mixins: [dateFormatter, dynamicContent, reportItemFlags],
  props: {
    delay: {
      type: Number,
      default: 5000,
    },
    reportsList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['report-click'],
  data() {
    return {
      lastVisibleItemIndex: 0,
      visibleElements: [],
      animId: 0,
      cycles: 0,
    }
  },
  computed: {
    itemHeight() {
      if (document.body.clientWidth <= 480) return '64px'
      else return '67px'
    },
  },
  mounted() {
    this.startAnimation()
  },
  beforeUnmount() {
    clearInterval(this.animId)
  },
  methods: {
    GetVisibleElements() {
      this.lastVisibleItemIndex++
      this.cycles = Math.trunc(
        this.lastVisibleItemIndex / this.reportsList.length
      )

      let index =
        this.lastVisibleItemIndex - this.cycles * this.reportsList.length
      if (this.visibleElements.length >= 3) this.visibleElements.splice(0, 1)
      this.visibleElements.push(this.reportsList[index])
    },
    startAnimation() {
      clearInterval(this.animId)
      for (let i = 0; i < this.reportsList.length; i++) {
        this.visibleElements.push(this.reportsList[i])
        this.lastVisibleItemIndex = i
        if (i == 2) break
      }
      this.animId = setInterval(this.GetVisibleElements, this.delay)
    },
    OnReportClick(report) {
      this.$emit('report-click', report)
    },
  },
}
</script>

<style scoped>
.item-height {
  /*height: v-bind(itemHeight);*/
}
.container-height {
  height: calc(v-bind(itemHeight) * 3);
}
.report-appear-enter-from {
  margin-bottom: calc(v-bind(itemHeight) * -1);
  opacity: 0;
}
.report-appear-enter-to {
  margin-bottom: 0;
  opacity: 1;
}
.report-appear-enter-active,
.report-appear-leave-active {
  transition: all 1s ease-out, margin-bottom 1s ease-out, opacity 1s ease-out;
}
.report-appear-leave-from {
  margin-top: 0;
  opacity: 1;
}
.report-appear-leave-to {
  margin-top: calc(v-bind(itemHeight) * -1);
  opacity: 0;
}
</style>
