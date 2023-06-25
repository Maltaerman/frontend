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
      v-for="(logObject, index) in logs"
      :key="index"
      class="flex w-full gap-x-4 py-4 px-6 shadow-cs2"
    >
      <div class="flex w-full gap-9">
        <div
          class="pt-2.5 text-h3 font-normal text-gray-c-500 tablet:text-h4 mobile:text-h4"
        >
          {{ new Date(logObject.created_at).toTimeString().split(' ')[0] }}
        </div>

        <div class="w-4/5 mobile:pr-6">
          <div
            v-for="(changedLogItem, idx) in getChangedLogs(logObject)"
            :key="idx"
            class="my-2.5 font-semibold"
          >
            <div class="group relative flex cursor-default flex-wrap gap-2">
              <div
                v-if="changedLogItem.old_value"
                class="flex gap-2"
              >
                <p class="h-6 w-4">
                  <SVG_status_list
                    :class-list="
                      getSVGColorClass(
                        changedLogItem.flag,
                        changedLogItem.old_value,
                      )
                    "
                    :icon="changedLogItem.flag"
                  />
                </p>
                <p
                  class="my-auto grow text-h3 uppercase tablet:text-h4 mobile:text-h4"
                  :class="
                    getTextColorClass(
                      changedLogItem.flag,
                      changedLogItem.old_value,
                    )
                  "
                >
                  {{ GetStatusTranslation(changedLogItem.old_value) }}
                </p>
              </div>
              <img
                alt="arrow"
                class="h-6 w-6"
                src="/src/assets/change-arrow.svg"
              >
              <div class="flex gap-2">
                <p class="h-6 w-4">
                  <SVG_status_list
                    :class-list="
                      getSVGColorClass(
                        changedLogItem.flag,
                        changedLogItem.new_value,
                      )
                    "
                    :icon="changedLogItem.flag"
                  />
                </p>
                <p
                  class="my-auto grow text-h3 uppercase tablet:text-h4 mobile:text-h4"
                  :class="
                    getTextColorClass(
                      changedLogItem.flag,
                      changedLogItem.new_value,
                    )
                  "
                >
                  {{ GetStatusTranslation(changedLogItem.new_value) }}
                </p>
              </div>
              <div class="tooltip">
                {{ getTooltipText(changedLogItem.flag) }}
              </div>
            </div>
            <Expander
              v-if="changedLogItem.description"
              class="font-normal"
            >
              {{ changedLogItem.description }}
            </Expander>
          </div>

          <div
            class="text-h3 font-semibold text-gray-c-500 tablet:text-h4 mobile:text-h4"
          >
            {{ logObject.user.username }}
            <span class="font-normal">
              {{ $t('general.in') }}
            </span>
            {{ logObject.user.organization_model.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable camelcase -->
<script>
import SVG_status_list from '../../ComponentsSVG/SVG_status_list.vue'
import Expander from '../../Other/Expander.vue'
import dateFormatter from '../../mixins/dateFormatter'
import dynamicContent from '../../mixins/dynamicContent'
import reportItemFlags from '../../mixins/reportItemFlags'

export default {
  name: 'HistoryItem',
  components: {
    Expander,
    SVG_status_list,
  },
  mixins: [dynamicContent, reportItemFlags, dateFormatter],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    log: Object,
    logs: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
  },
  methods: {
    getDate(strDate) {
      return this.GetDayDateString(strDate).replace(' ', ', ')
    },
    getChangedLogs(log) {
      const result = []
      if (!log.old_flags || Object.keys(log.old_flags).length <= 0) {
        Object.keys(log.new_flags).forEach((flag) => {
          result.push({
            flag,
            old_value: undefined,
            new_value: log.new_flags[flag].flag,
            description: log.new_flags.description,
          })
        })
        return result
      }

      // eslint-disable-next-line array-callback-return
      Object.keys(log.old_flags).map((flag) => {
        if (log.old_flags[flag].flag !== log.new_flags[flag].flag) {
          result.push({
            flag,
            old_value: log.old_flags[flag].flag,
            new_value: log.new_flags[flag].flag,
            description: '',
          })
        }

        if (
          log.old_flags[flag].description !== log.new_flags[flag].description
        ) {
          // eslint-disable-next-line eqeqeq, no-shadow
          const el = result.find((el) => el.flag == flag)
          if (!el) {
            result.push({
              flag,
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
      // console.log(result);
      return result
    },
  },
}
</script>

<style scoped></style>
