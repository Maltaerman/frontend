<template>
  <div class="mb-6">
    <div class="w-full bg-gray-c-100 py-2 px-6 shadow-cs2">
      <p
        class="text-h2 font-semibold capitalize text-black tablet:text-h3 mobile:text-h3"
      >
        {{ getDate(logs[0].created_at) }}
      </p>
    </div>

    <div
      v-for="(log, index) in logs"
      :key="index"
      class="flex w-full gap-x-4 py-4 shadow-cs2"
    >
      <div
        class="comm:gap-9 flex w-full flex-wrap justify-between comp:flex-nowrap"
      >
        <div
          class="pt-1 align-middle text-h3 font-normal text-gray-c-500 comp:px-4 tablet:text-h4 mobile:text-h4"
        >
          {{ new Date(log.created_at).toTimeString().split(' ')[0] }}
        </div>
        <div class="order-3 w-full shrink grow comp:order-2 mobile:pr-6">
          <div
            v-for="(item, idx) in getChangedLogs(log)"
            :key="idx"
            class="my-2.5 font-semibold"
          >
            <div class="group relative flex cursor-default flex-wrap gap-4">
              <div v-if="item.old_value" class="flex gap-2">
                <p class="h-6 w-4">
                  <SVG_status_list
                    :classList="getSVGColorClass(item.flag, item.old_value)"
                    :icon="item.flag"
                  />
                </p>
                <p
                  class="my-auto grow text-h3 uppercase tablet:text-h4 mobile:text-h4"
                  :class="getTextColorClass(item.flag, item.old_value)"
                >
                  {{ GetStatusTranslation(item.old_value) }}
                </p>
              </div>
              <img
                alt="arrow"
                class="h-6 w-6"
                src="/src/assets/change-arrow.svg"
              />
              <div class="flex gap-2">
                <p class="h-6 w-4">
                  <SVG_status_list
                    class="h-full w-full"
                    :classList="getSVGColorClass(item.flag, item.new_value)"
                    :icon="item.flag"
                  />
                </p>
                <p
                  class="my-auto grow text-base text-h3 uppercase tablet:text-h4 mobile:text-h4"
                  :class="getTextColorClass(item.flag, item.new_value)"
                >
                  {{ GetStatusTranslation(item.new_value) }}
                </p>
              </div>
              <div class="tooltip">
                {{ getTooltipText(item.flag) }}
              </div>
            </div>
            <Expander v-if="item.description" class="font-normal">
              {{ item.description }}
            </Expander>
          </div>

          <router-link
            class="cursor-pointer text-h3 font-semibold text-gray-c-500 tablet:text-h4 mobile:text-h4"
            :to="getLocationOverviewRoute(log.location)"
          >
            {{ log.user.username }}
            <span class="font-normal">
              {{ $t('general.in') }}
            </span>
            {{ ReportAddressFull(log.location) }}
          </router-link>
        </div>
        <div class="order-2 comp:order-3">
          <button
            class="hide-button group"
            @click="toggleRecordVisibility(log.id)"
          >
            <div class="relative">
              <div class="h-full w-0.5 bg-blue-c-500"></div>
              <SVG_eye class="hide-button-svg" />
            </div>
            <!--						<SVG_eye v-if="log.hidden" class="hide-button-svg"/>-->
            <div v-if="log.hidden" class="hidden whitespace-nowrap comp:block">
              {{ $t('OrganizationChangeLog.showRecord') }}
            </div>

            <!--						<SVG_eye_crossed v-if="!log.hidden" class="hide-button-svg"/>-->
            <div v-if="!log.hidden" class="hidden whitespace-nowrap comp:block">
              {{ $t('OrganizationChangeLog.hideRecord') }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SVG_eye from '../../ComponentsSVG/Icons/SVG_eye.vue'
import SVG_status_list from '../../ComponentsSVG/SVG_status_list.vue'
import dateFormatter from '../../mixins/dateFormatter.js'
import dynamicContent from '../../mixins/dynamicContent.js'
import reportItemFlags from '../../mixins/reportItemFlags.js'

export default {
  name: 'OrganizationChangeLogItem',
  components: {
    SVG_eye,
    SVG_status_list,
  },
  mixins: [dynamicContent, reportItemFlags, dateFormatter],
  props: {
    logs: Array,
  },
  emits: ['record-visibility-toggle'],
  methods: {
    getDate(strDate) {
      return this.GetDayDateString(strDate).replace(' ', ', ')
    },
    getChangedLogs(log) {
      let result = []
      if (!log.old_flags || Object.keys(log.old_flags).length <= 0) {
        Object.keys(log.new_flags).forEach((flag) => {
          result.push({
            flag: flag,
            old_value: undefined,
            new_value: log.new_flags[flag].flag,
            description: log.new_flags.description,
          })
        })
        return result
      }

      Object.keys(log.old_flags).map((flag) => {
        if (log.old_flags[flag].flag !== log.new_flags[flag].flag) {
          result.push({
            flag: flag,
            old_value: log.old_flags[flag].flag,
            new_value: log.new_flags[flag].flag,
            description: '',
          })
        }

        if (
          log.old_flags[flag].description !== log.new_flags[flag].description
        ) {
          let el = result.find((el) => el.flag == flag)
          if (!el) {
            result.push({
              flag: flag,
              old_value: log.old_flags[flag].flag,
              new_value: log.new_flags[flag].flag,
              description:
                log.new_flags[flag].description.length > 0
                  ? log.new_flags[flag].description
                  : this.$t('reportTools.descriptionDeleted'),
            })
          } else {
            el.description = log.new_flags[flag].description
          }
        }
      })
      return result
    },
    toggleRecordVisibility(id) {
      this.$emit('record-visibility-toggle', id)
    },
    getLocationOverviewRoute(log) {
      let url = '/main/overview'
      if (!log) return url
      if (log.id) url = `/main/overview?id=${log.id}`
      if (log.position)
        url += `&lat=${log.position.lat}&lng=${log.position.lng}`
      return url
    },
  },
}
</script>

<style scoped>
.hide-button {
  @apply flex
		flex-nowrap
		items-center
		gap-2
		p-2
		text-h3
		text-blue-c-500 hover:border-blue-c-400 hover:text-blue-c-400 active:border-blue-c-600
		active:text-blue-c-600 disabled:border-gray-c-300
		disabled:text-gray-c-300 comp:p-0;
}
.hide-button-svg {
  @apply block h-full fill-blue-c-500
		group-hover:fill-blue-c-300
		group-active:fill-blue-c-600
		group-disabled:fill-gray-c-300;
}
</style>
