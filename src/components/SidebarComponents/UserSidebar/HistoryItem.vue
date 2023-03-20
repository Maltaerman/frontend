<template>
  <div class="mb-6">
    <div class="w-full bg-gray-c-100 py-2 px-6 shadow-cs2">
      <p
        class="text-h2 font-semibold capitalize text-black tablet:text-h3 mobile:text-h3"
      >
        {{ getDate(logs[0].created_at) }}
      </p>
    </div>

    <div v-for="log in logs" class="flex w-full gap-x-4 py-4 px-6 shadow-cs2">
      <div class="flex w-full gap-9">
        <div
          class="pt-2.5 text-h3 font-normal text-gray-c-500 tablet:text-h4 mobile:text-h4"
        >
          {{ new Date(log.created_at).toTimeString().split(' ')[0] }}
        </div>

        <div class="w-4/5 mobile:pr-6">
          <div v-for="item in getChangedLogs(log)" class="my-2.5 font-semibold">
            <div class="group relative flex cursor-default flex-wrap gap-2">
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
                    :classList="getSVGColorClass(item.flag, item.new_value)"
                    :icon="item.flag"
                  />
                </p>
                <p
                  class="my-auto grow text-base text-h3 uppercase tablet:text-h4 mobile:text-h4"
                  :class="getTextColorClass(item.flag, item.new_value)"
                >
                  {{ GetStatusTranslation(item.new_value) }}
                  <!--										{{item.new_value}}-->
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

          <div
            class="text-h3 font-semibold text-gray-c-500 tablet:text-h4 mobile:text-h4"
          >
            {{ log.user.username }}
            <span class="font-normal">
              {{ $t('general.in') }}
            </span>
            {{ log.user.organization_model.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SVG_status_list from '../../ComponentsSVG/SVG_status_list.vue'
import Expander from '../../Other/Expander.vue'
import dateFormatter from '../../mixins/dateFormatter.js'
import dynamicContent from '../../mixins/dynamicContent.js'
import reportItemFlags from '../../mixins/reportItemFlags.js'
export default {
  name: 'HistoryItem',
  components: {
    Expander,
    SVG_status_list,
  },
  mixins: [dynamicContent, reportItemFlags, dateFormatter],
  props: {
    log: Object,
    logs: {
      type: Array,
      default: [],
    },
  },
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
      //console.log(result);
      return result
    },
  },
}
</script>

<style scoped></style>
