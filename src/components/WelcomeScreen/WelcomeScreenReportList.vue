<template>
  <transition-group
    class="container-height flex flex-col flex-nowrap overflow-hidden"
    name="report-appear"
    tag="div"
  >
    <div
      v-for="report in visibleElements"
      :key="`rep${report.id}`"
      class="item-height group flex w-full shrink-0 grow-0 cursor-pointer flex-nowrap items-center hover:bg-blue-c-100"
      @click="OnReportClick(report)"
    >
      <div
        class="h-3/5 w-0.5 shrink-0 grow-0 bg-gray-c-300 duration-200 group-hover:h-full group-hover:bg-blue-c-400"
      />
      <div class="h-full shrink-0 grow-0 grow-0 py-2 pr-4 pl-3.5">
        <div
          class="text-h4 duration-100 group-hover:font-semibold group-hover:text-blue-c-400 mobile:text-b3"
        >
          {{ ReportAddressFull(report) }}
        </div>
        <div
          class="flex flex-nowrap items-center gap-2 pt-1 text-b3 font-semibold text-gray-c-500"
        >
          <div
            class="rounded-2xl border border-gray-c-200 bg-white px-2 py-0.5"
            :class="
              getTextColorClass(
                reportFlags.buildingCondition,
                report.reports.buildingCondition.flag,
              )
            "
          >
            <div class="inline-block h-3 w-3">
              <SVG_building_condition
                class="h-full w-full"
                :class="
                  getSVGColorClass(
                    reportFlags.buildingCondition,
                    report.reports.buildingCondition.flag,
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
import SVG_building_condition from '@/components/ComponentsSVG/SVG_building_condition.vue'
import dateFormatter from '@/components/mixins/dateFormatter.js'
import dynamicContent from '@/components/mixins/dynamicContent.js'
import reportItemFlags from '@/components/mixins/reportItemFlags.js'

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
        this.lastVisibleItemIndex / this.reportsList.length,
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
